import Emittery from "emittery";
import { IOrderBookEmitter } from "@/app/utils/OrderBookEmitter/IOrderBookEmitter";
import { TOrderBook } from "@/app/dtos/TOrderBook";
import { IMarketOrderBook } from "@/app/dtos/IMarketOrderBook";
import { prepareOrders } from "@/app/utils/prepareOrders";
import { IOrderBookFullInfo } from "@/app/dtos/IOrderBookFullInfo";

export abstract class OrderBookEmitter
  extends Emittery
  implements IOrderBookEmitter
{
  markets: Set<string> = new Set<string>();
  orderBook: IMarketOrderBook = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private interval: NodeJS.Timer;
  previousAverage: {
    [market: string]: number;
  } = {};

  start() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);

    return this;
  }

  stop() {
    clearInterval(this.interval);
    return this;
  }

  addMarket(market: string) {
    this.markets.add(market);
    return this;
  }

  removeMarket(market: string) {
    this.markets.delete(market);
    return this;
  }

  tick() {
    const data: IOrderBookFullInfo = Object.keys(this.orderBook).reduce(
      (acc: IOrderBookFullInfo, market) => {
        const bids: TOrderBook = prepareOrders(
          this.orderBook[market].bids,
          "bids"
        );

        const asks: TOrderBook = prepareOrders(
          this.orderBook[market].asks,
          "asks"
        );

        const minBid = bids[0][0] || 0;
        const maxAsk = asks[0][0] || 0;

        const average =
          minBid && maxAsk
            ? +((minBid + maxAsk) / 2).toFixed(8)
            : minBid || maxAsk || 0;

        const destination =
          average > this.previousAverage[market] ? "up" : "down";
        this.previousAverage[market] = average;

        acc[market] = {
          bids,
          asks,
          destination,
          average,
        };

        return acc;
      },
      {}
    );

    this.emit("update", data);
  }
}
