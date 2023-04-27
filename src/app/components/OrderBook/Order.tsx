import React from "react";
import styles from "./OrderBook.module.scss";

interface OrderProps {
  price: number;
  volume: number;
}

const Order: React.FC<OrderProps> = ({ price, volume }) => {
  return (
    <div className={styles.order}>
      <span>{price}</span>
      <span>{volume}</span>
    </div>
  );
};

export default Order;
