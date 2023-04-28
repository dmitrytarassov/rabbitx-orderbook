"use client";
import React from "react";
import { useOrderBook } from "@/app/hooks/useOrderBook";
import styles from "./OrderBook.module.scss";
import Orders from "@/app/components/OrderBook/Orders";
import classNames from "classnames";

interface OrderBookProps {
  market: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ market }) => {
  const { watch, unwatch, getMarketOrderBook, orderBook } = useOrderBook();

  React.useEffect(() => {
    watch(market);

    return () => {
      unwatch(market);
    };
  }, [market]);

  const marketOrderBook = React.useMemo(
    () => getMarketOrderBook(market),
    [market, orderBook[market]]
  );

  console.log("rerender OrderBook");

  return (
    <div className={styles.container}>
      {market === "none" ? (
        <div className={styles.info}>Please select market</div>
      ) : (
        <>
          <div className={styles.info}>Market: {market}</div>
          <Orders orders={marketOrderBook.bids} type="bids" />
          <div
            className={classNames(styles.info, {
              [styles.up]: marketOrderBook.destination === "up",
              [styles.down]: marketOrderBook.destination === "down",
            })}
          >
            {marketOrderBook.average || ""}
          </div>
          <Orders orders={marketOrderBook.asks} type="asks" />
        </>
      )}
    </div>
  );
};

export default React.memo(OrderBook);
