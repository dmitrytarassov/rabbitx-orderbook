import { TOrderBook } from "@/app/dtos/TOrderBook";

export interface IOrderBookData {
  asks: TOrderBook;
  bids: TOrderBook;
  market_id: string;
  sequence: number;
  timestamp: number;
}
