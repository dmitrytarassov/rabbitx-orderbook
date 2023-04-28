"use client";
import { useContext } from "react";
import { OrderBookContext } from "@/app/providers/OrderBook.provider";

export const useOrderBook = () => {
  const context = useContext(OrderBookContext);

  if (!context) {
    throw new Error("Can not find context OrderBookContext");
  }

  return context;
};
