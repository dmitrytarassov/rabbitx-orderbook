import React from "react";
import { TOrderBook } from "@/app/dtos/TOrderBook";
import styles from "./OrderBook.module.scss";
import Order from "@/app/components/OrderBook/Order";
import { BidsOrAsks } from "@/app/dtos/BidsOrAsks";
import classNames from "classnames";

interface OrdersProps {
  orders: TOrderBook;
  type: BidsOrAsks;
}

const Orders: React.FC<OrdersProps> = ({ orders, type }) => {
  const _orders = [...orders].splice(0, 15);

  return (
    <div
      className={classNames(styles.block, { [styles.asks]: type === "asks" })}
    >
      {_orders.map((e, i) => (
        <Order
          key={`${type}_${e[0]}_${e[1]}_${i}`}
          price={e[0]}
          volume={e[1]}
        />
      ))}
    </div>
  );
};

export default Orders;
