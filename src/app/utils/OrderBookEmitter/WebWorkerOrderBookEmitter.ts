"use client";
import { OrderBookEmitter } from "@/app/utils/OrderBookEmitter/OrderBookEmitter";
import { IOrderBookEmitter } from "@/app/utils/OrderBookEmitter/IOrderBookEmitter";

const Worker =
  typeof window !== "undefined" ? (window as any).Worker : class Worker {};

export class WebWorkerOrderBookEmitter
  extends OrderBookEmitter
  implements IOrderBookEmitter
{
  active = false;
  centrifugeWorker: Worker;

  constructor() {
    super();
    this.centrifugeWorker = new Worker("web-worker.js");
  }

  listener = (event: MessageEvent<any>) => {
    const { action, data } = event.data;

    switch (action) {
      case "connect":
        // console.log("Centrifuge connected:", context);
        break;
      case "disconnect":
        // console.log("Centrifuge disconnected:", context);
        break;
      case "message":
        // console.log(`Received message from channel ${channel}:`, data);
        this.emit("update", data);
        break;
      case "published":
        // console.log(`Published message to channel ${channel}:`, data);
        break;
      case "publishError":
        // console.error("Publish error:", error);
        break;
    }
  };

  start() {
    super.start();

    this.centrifugeWorker.addEventListener("message", this.listener);

    // Connect to Centrifuge server
    this.centrifugeWorker.postMessage({ action: "connect" });

    this.active = true;

    return this;
  }

  stop(): this {
    super.stop();

    this.markets.forEach((market) => {
      super.removeMarket(market);
      this.removeSubscription(market);
    });

    this.updateSubscriptions();

    this.centrifugeWorker.removeEventListener("message", this.listener);

    this.centrifugeWorker.postMessage({
      action: "disconnect",
    });

    this.active = false;

    return this;
  }

  addMarket(market: string): this {
    super.addMarket(market);

    this.updateSubscriptions();

    return this;
  }

  removeMarket(market: string): this {
    super.removeMarket(market);

    this.removeSubscription(market);

    this.updateSubscriptions();

    return this;
  }

  removeSubscription(market: string) {
    const chanelName = `orderbook:${market}`;
    this.centrifugeWorker.postMessage({
      action: "unsubscribe",
      data: { channel: chanelName },
    });
  }

  private updateSubscriptions() {
    this.markets.forEach((market) => {
      const chanelName = `orderbook:${market}`;

      this.centrifugeWorker.postMessage({
        action: "subscribe",
        data: { channel: chanelName },
      });
    });
  }
}
