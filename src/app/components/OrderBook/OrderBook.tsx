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
  const orderBook = useOrderBook();

  React.useEffect(() => {
    orderBook.watch(market);

    return () => {
      orderBook.unwatch(market);
    };
  }, [market]);

  const marketOrderBook = React.useMemo(
    () => orderBook.orderBook[market],
    [market, orderBook.orderBook[market]]
  );

  return (
    <div className={styles.container}>
      {market === "none" ? (
        <div className={styles.info}>Please select market</div>
      ) : (
        <>
          <div className={styles.info}>Market: {market}</div>
          <Orders orders={marketOrderBook?.bids || []} type="bids" />
          <div
            className={classNames(
              styles.info,
              marketOrderBook?.destination === "up" ? styles.up : styles.down
            )}
          >
            {marketOrderBook?.average}
          </div>
          <Orders orders={marketOrderBook?.asks || []} type="asks" />
        </>
      )}
    </div>
  );
};

export default OrderBook;
