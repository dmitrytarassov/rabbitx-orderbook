"use client";
import React, { createContext } from "react";
import { WebSocketOrderBookEmitter } from "@/app/utils/OrderBookEmitter/WebSocketOrderBookEmitter";
import { IOrderBookEmitter } from "@/app/utils/OrderBookEmitter/IOrderBookEmitter";
import { TOrderBook } from "@/app/dtos/TOrderBook";
import { MarketDestination } from "@/app/dtos/MarketDestination";
import { WebWorkerOrderBookEmitter } from "@/app/utils/OrderBookEmitter/WebWorkerOrderBookEmitter";
import { WebSocketOrWebWorker } from "@/app/dtos/WebSocketOrWebWorker";

interface OrderBookProviderProps {
  children: React.ReactNode;
}

export interface IOrderBookContext {
  orderBook: {
    [market: string]: {
      bids: TOrderBook;
      asks: TOrderBook;
      average: number;
      destination: MarketDestination;
    };
  };
  watch: (pair: string) => void;
  unwatch: (pair: string) => void;
  updateMode: (mode: WebSocketOrWebWorker) => void;
  mode: WebSocketOrWebWorker;
}

export const OrderBookContext = createContext<IOrderBookContext>({
  orderBook: {},
  watch: () => ({}),
  unwatch: () => ({}),
  updateMode: () => ({}),
  mode: "web_socket",
});

const watchersCount: {
  [market: string]: { count: number; active: boolean };
} = {};

const webSocketOrderBookEmitter = new WebSocketOrderBookEmitter();
const webWorkerOrderBookEmitter = new WebWorkerOrderBookEmitter();

const OrderBookProvider: React.FC<OrderBookProviderProps> = ({ children }) => {
  const [mode, set_mode] = React.useState<WebSocketOrWebWorker>("web_socket");
  const [orderBook, set_orderBook] = React.useState<
    IOrderBookContext["orderBook"]
  >({});
  const [orderBookEmitter, set_orderBookEmitter] =
    React.useState<IOrderBookEmitter>(webSocketOrderBookEmitter);

  const watch = (market: string) => {
    if (market !== "none") {
      if (!watchersCount[market]) {
        watchersCount[market] = {
          count: 1,
          active: false,
        };
      } else {
        watchersCount[market].count += 1;
      }
    }
    update();
  };

  const unwatch = (market: string) => {
    if (market !== "none") {
      watchersCount[market].count -= 1;
      update();
    }
  };

  const update = (forceUpdate = false) => {
    Object.keys(watchersCount).forEach((market) => {
      const element = watchersCount[market];
      if ((element.count > 0 && !element.active) || forceUpdate) {
        orderBookEmitter.addMarket(market);
        element.active = true;
      } else if (element.count === 0 && element.active) {
        orderBookEmitter.removeMarket(market);
        element.active = false;
      }
    });
  };

  React.useEffect(() => {
    if (orderBookEmitter) {
      orderBookEmitter.start();
      orderBookEmitter.on("update", (data: IOrderBookContext["orderBook"]) => {
        if (Object.keys(data).length > 0) {
          set_orderBook(data);
        }
      });
      update(true);
    }

    return () => {
      if (orderBookEmitter) {
        orderBookEmitter.stop();
      }
    };
  }, [orderBookEmitter]);

  const updateMode = (mode: WebSocketOrWebWorker) => {
    if (mode === "web_socket") {
      webWorkerOrderBookEmitter.stop();
      set_orderBookEmitter(webSocketOrderBookEmitter);
    } else {
      webSocketOrderBookEmitter.stop();
      set_orderBookEmitter(webWorkerOrderBookEmitter);
    }
    set_mode(mode);
  };

  return (
    <OrderBookContext.Provider
      value={{
        orderBook,
        watch,
        unwatch,
        updateMode,
        mode,
      }}
    >
      {children}
    </OrderBookContext.Provider>
  );
};

export default OrderBookProvider;
