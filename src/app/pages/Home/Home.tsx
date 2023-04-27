"use client";
import React from "react";
import MarketOrderBook from "@/app/components/MarketOrderBook/MarketOrderBook";
import styles from "./Home.module.scss";
import { useOrderBook } from "@/app/hooks/useOrderBook";
import { WebSocketOrWebWorker } from "@/app/dtos/WebSocketOrWebWorker";
import Tabs from "@/app/components/Tabs/Tabs";
import titleStyles from "@/app/modules/title.module.scss";

interface HomeProps {}

const options: {
  name: string;
  value: WebSocketOrWebWorker;
}[] = [
  { name: "Web Socket (browser)", value: "web_socket" },
  { name: "Web Worker", value: "web_worker" },
];

const Home: React.FC<HomeProps> = ({}) => {
  const orderBook = useOrderBook();

  const update = (value: string) => {
    orderBook.updateMode(value as WebSocketOrWebWorker);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1>Welcome to Rabbit DEX OrderBook</h1>
        <div className={styles.tabs}>
          <div className={titleStyles.title}>Select mode</div>
          <Tabs options={options} value={orderBook.mode} onChange={update} />
        </div>
        <div className={styles.content}>
          <div className={styles.block}>
            <MarketOrderBook title="OrderBook 1" />
          </div>
          <div className={styles.block}>
            <MarketOrderBook title="OrderBook 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
