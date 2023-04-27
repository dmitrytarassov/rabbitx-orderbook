import { IOrders } from "@/app/dtos/IOrders";
import { TOrderBook } from "@/app/dtos/TOrderBook";

export const prepareOrders = (
  orders: IOrders,
  type: "bids" | "asks"
): TOrderBook => {
  const _orders: TOrderBook = Object.keys(orders)
    .map((key) => [+key, +orders[+key]])
    .filter(([, size]) => size > 0)
    .sort(([priceA], [priceB]) =>
      (type === "bids" ? priceA > priceB : priceA < priceB) ? 1 : -1
    ) as TOrderBook;

  return _orders;
};
