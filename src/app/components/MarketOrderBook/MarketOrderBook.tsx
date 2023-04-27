"use client";
import React from "react";
import styles from "./MarketOrderBook.module.scss";
import Tabs from "@/app/components/Tabs/Tabs";
import { TabsOptions } from "@/app/dtos/TabsOptions";
import OrderBook from "@/app/components/OrderBook/OrderBook";
import titleStyles from "@/app/modules/title.module.scss";

interface MarketOrderBookProps {
  title: string;
}

const markets: TabsOptions = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "SOL / USD",
    value: "SOL-USD",
  },
  {
    name: "BTC / USD",
    value: "BTC-USD",
  },
  {
    name: "ETH / USD",
    value: "ETH-USD",
  },
];

const MarketOrderBook: React.FC<MarketOrderBookProps> = ({ title }) => {
  const [market, set_market] = React.useState<string>("none");

  return (
    <div className={styles.container}>
      <div className={titleStyles.title}>{title}</div>
      <div className={styles.tabs}>
        <Tabs options={markets} value={market} onChange={set_market} />
      </div>
      <OrderBook market={market} />
    </div>
  );
};

export default MarketOrderBook;
