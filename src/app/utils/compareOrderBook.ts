import { TOrderBook } from "@/app/dtos/TOrderBook";

export const compareOrderBook = (
  newOrderBook: TOrderBook,
  oldOrderBook: TOrderBook
): boolean => {
  return newOrderBook.join("") === oldOrderBook.join("");
};
