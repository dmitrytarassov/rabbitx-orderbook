import { prepareOrderBook } from "@/app/utils/prepareOrderBook";
import { TOrderBook } from "@/app/dtos/TOrderBook";
import { IMarketOrderBook } from "@/app/dtos/IMarketOrderBook";
import { IOrderBookFullInfo } from "@/app/dtos/IOrderBookFullInfo";
import { prepareOrders } from "@/app/utils/prepareOrders";
import { PublicationContext } from "centrifuge/build/types";
import { createCentrifuge } from "@/app/utils/createCentrifuge";

const centrifuge = createCentrifuge(async () => {
  if (typeof fetch !== "undefined") {
    const response = await fetch("/api/token");
    const data = await response.json();
    return data.token;
  } else {
    return "";
  }
});

let orderBook: IMarketOrderBook = {};
const previousAverage: {
  [market: string]: number;
} = {};

const tick = () => {
  const data: IOrderBookFullInfo = Object.keys(orderBook).reduce(
    (acc: IOrderBookFullInfo, market) => {
      if (market && orderBook[market]) {
        const bids: TOrderBook = prepareOrders(orderBook[market].bids, "bids");
        const asks: TOrderBook = prepareOrders(orderBook[market].asks, "asks");

        const minBid = bids[0][0] || 0;
        const maxAsk = asks[0][0] || 0;

        const average =
          minBid && maxAsk
            ? +((minBid + maxAsk) / 2).toFixed(8)
            : minBid || maxAsk || 0;

        const destination = average > previousAverage[market] ? "up" : "down";
        previousAverage[market] = average;

        acc[market] = {
          bids,
          asks,
          destination,
          average,
        };
      }

      return acc;
    },
    {}
  );

  self.postMessage({ action: "message", data });
};

let interval: NodeJS.Timer;

const setData = (market: string, bids: TOrderBook, asks: TOrderBook) => {
  orderBook = prepareOrderBook(orderBook, market, bids, asks);
};

self.addEventListener("message", (event) => {
  const { action, data } = event.data;
  const channel = (data && data.channel) || "";
  const [, market] = channel.split(":");

  const onPublication = (response: PublicationContext) => {
    setData(market, response.data.asks, response.data.bids);
  };

  switch (action) {
    case "subscribe":
      if (!centrifuge.getSubscription(channel)) {
        const sub = centrifuge.newSubscription(channel);

        sub.on("subscribed", (response) => {
          setData(market, response.data.asks, response.data.bids);

          sub.on("publication", onPublication);
        });
        sub.subscribe();
      }

      break;

    case "unsubscribe":
      const sub = centrifuge.getSubscription(channel);
      if (sub) {
        sub.off("publication", onPublication);
        centrifuge.removeSubscription(sub);
      }
      break;

    case "connect":
      centrifuge.connect();
      interval = setInterval(() => {
        tick();
      }, 1000);
      break;

    case "disconnect":
      centrifuge.disconnect();
      clearInterval(interval);
      break;
  }
});
