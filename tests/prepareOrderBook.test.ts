import { beforeAll, describe, expect, it } from "@jest/globals";
import { prepareOrderBook } from "@/app/utils/prepareOrderBook";
import { IMarketOrderBook } from "@/app/dtos/IMarketOrderBook";
import { IOrders } from "@/app/dtos/IOrders";
import { TOrderBook } from "@/app/dtos/TOrderBook";

describe("prepare order book", function () {
  const marketAInitialBids: IOrders = {
    1: 10,
    2: 10,
  };

  const marketAInitialAsks: IOrders = {
    3: 10,
    4: 10,
  };

  const marketAAdditionalBids: IOrders = {
    1: 20,
    3: 10,
  };

  const marketAAdditionalAsks: IOrders = {
    3: 20,
    5: 10,
  };

  const marketAAdditionalBidsFormatted: TOrderBook = [
    [1, 20],
    [3, 10],
  ];
  const marketAAdditionalAsksFormatted: TOrderBook = [
    [3, 20],
    [5, 10],
  ];

  const marketBInitialBids: IOrders = {
    1: 10,
    2: 10,
  };

  const marketBInitialAsks: IOrders = {
    3: 10,
    4: 10,
  };

  const marketBInitialBidsFormatted: TOrderBook = [
    [1, 10],
    [2, 10],
  ];

  const marketBInitialAsksFormatted: TOrderBook = [
    [3, 10],
    [4, 10],
  ];

  const orderBook: IMarketOrderBook = {
    marketA: {
      bids: marketAInitialBids,
      asks: marketAInitialAsks,
    },
  };

  let newOrderBook: IMarketOrderBook = {};

  beforeAll(() => {
    newOrderBook = prepareOrderBook(
      orderBook,
      "marketB",
      marketBInitialBidsFormatted,
      marketBInitialAsksFormatted
    );
  });

  it("orderbook should be updated", async function () {
    expect(newOrderBook).toEqual({
      marketA: {
        bids: marketAInitialBids,
        asks: marketAInitialAsks,
      },
      marketB: {
        bids: marketBInitialBids,
        asks: marketBInitialAsks,
      },
    });
  });

  it("old orderbook should be not updated", async function () {
    expect(orderBook).toEqual({
      marketA: {
        bids: marketAInitialBids,
        asks: marketAInitialAsks,
      },
    });
  });

  describe("add new orders to market 1", function () {
    let _newOrderBook: IMarketOrderBook = {};

    beforeAll(() => {
      _newOrderBook = prepareOrderBook(
        newOrderBook,
        "marketA",
        marketAAdditionalBidsFormatted,
        marketAAdditionalAsksFormatted
      );
    });

    it("orderbook be updated", async function () {
      expect(_newOrderBook).toEqual({
        marketA: {
          bids: { ...marketAInitialBids, ...marketAAdditionalBids },
          asks: { ...marketAInitialAsks, ...marketAAdditionalAsks },
        },
        marketB: {
          bids: marketBInitialBids,
          asks: marketBInitialAsks,
        },
      });
    });
  });
});
