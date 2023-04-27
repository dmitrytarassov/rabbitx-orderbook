import { MarketDestination } from "@/app/dtos/MarketDestination";
import { TOrderBook } from "@/app/dtos/TOrderBook";

export interface IOrderBookFullInfo {
  [market: string]: {
    bids: TOrderBook;
    asks: TOrderBook;
    average: number;
    destination: MarketDestination;
  };
}
