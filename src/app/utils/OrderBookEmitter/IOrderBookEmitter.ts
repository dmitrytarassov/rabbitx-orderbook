import Emittery from "emittery";

export interface IOrderBookEmitter extends Emittery {
  addMarket(market: string): this;
  removeMarket(market: string): this;

  start(): this;
  stop(): this;
}
