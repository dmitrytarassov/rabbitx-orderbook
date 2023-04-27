import { OrderBookEmitter } from "@/app/utils/OrderBookEmitter/OrderBookEmitter";
import { IOrderBookEmitter } from "@/app/utils/OrderBookEmitter/IOrderBookEmitter";
import { TOrderBook } from "@/app/dtos/TOrderBook";
import { prepareOrderBook } from "@/app/utils/prepareOrderBook";
import { PublicationContext } from "centrifuge/build/types";
import { createCentrifuge } from "@/app/utils/createCentrifuge";

const centrifuge = createCentrifuge(async () => {
  if (typeof window !== "undefined") {
    const response = await fetch("/api/token");
    const data = await response.json();
    return data.token;
  } else {
    return "";
  }
});

export class WebSocketOrderBookEmitter
  extends OrderBookEmitter
  implements IOrderBookEmitter
{
  active = false;

  publicationHandlers: {
    [chanel: string]: (response: PublicationContext) => void;
  } = {};

  constructor() {
    super();

    setInterval(this.sync, 10000);
  }

  start() {
    super.start();

    centrifuge.connect();

    centrifuge.on("error", (args) => {
      console.log("centrifuge error", args);
    });

    centrifuge.on("message", (args) => {
      console.log("centrifuge message", args);
    });

    this.active = true;

    return this;
  }

  stop(): this {
    super.stop();

    this.markets.forEach((market) => {
      super.removeMarket(market);
      this.removeSubscription(market);
    });

    this.updateSubscriptions();

    centrifuge.disconnect();

    this.active = false;

    return this;
  }

  sync() {
    if (this.active) {
      this.stop().start();
    }
  }

  addMarket(market: string): this {
    super.addMarket(market);
    this.updateSubscriptions();

    return this;
  }

  removeMarket(market: string): this {
    super.removeMarket(market);

    this.removeSubscription(market);

    this.updateSubscriptions();

    return this;
  }

  removeSubscription(market: string) {
    const chanelName = `orderbook:${market}`;

    const sub = centrifuge.getSubscription(chanelName);
    if (sub) {
      sub.off("publication", this.publicationHandlers[chanelName]);
      centrifuge.removeSubscription(sub);
    }
  }

  private setData(market: string, bids: TOrderBook, asks: TOrderBook) {
    this.orderBook = prepareOrderBook(this.orderBook, market, bids, asks);
  }

  private updateSubscriptions() {
    this.markets.forEach((market) => {
      const chanelName = `orderbook:${market}`;
      if (!centrifuge.getSubscription(chanelName)) {
        const sub = centrifuge.newSubscription(chanelName);

        this.publicationHandlers[chanelName] = (
          response: PublicationContext
        ) => {
          this.setData(market, response.data.asks, response.data.bids);
        };

        sub.on("subscribed", (response) => {
          this.setData(market, response.data.asks, response.data.bids);

          sub.on("publication", this.publicationHandlers[chanelName]);
        });
        sub.subscribe();
      }
    });
  }
}
