import React from "react";
import { TabsOptions } from "@/app/dtos/TabsOptions";
import styles from "./Tabs.module.scss";
import classNames from "classnames";

interface TabsProps {
  options: TabsOptions;
  value: string;
  onChange: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ options, onChange, value }) => {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div
          className={classNames(styles.tab, {
            [styles.active]: value === option.value,
          })}
          onClick={() => onChange(option.value)}
          key={option.value}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
