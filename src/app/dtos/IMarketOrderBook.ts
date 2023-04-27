import { IOrders } from "@/app/dtos/IOrders";

export interface IMarketOrderBook {
  [market: string]: {
    bids: IOrders;
    asks: IOrders;
  };
}
