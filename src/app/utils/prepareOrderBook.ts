import { TOrderBook } from "@/app/dtos/TOrderBook";
import { IMarketOrderBook } from "@/app/dtos/IMarketOrderBook";
import { IOrders } from "@/app/dtos/IOrders";

export const prepareOrderBook = (
  orderBook: IMarketOrderBook,
  market: string,
  bids: TOrderBook,
  asks: TOrderBook
): IMarketOrderBook => {
  return {
    ...orderBook,
    [market]: {
      bids: {
        ...(orderBook[market]?.bids || {}),
        ...bids.reduce((acc: IOrders, [price, value]) => {
          acc[price] = value;
          return acc;
        }, {}),
      },
      asks: {
        ...(orderBook[market]?.asks || {}),
        ...asks.reduce((acc: IOrders, [price, value]) => {
          acc[price] = value;
          return acc;
        }, {}),
      },
    },
  };
};
