import { describe, expect, it } from "@jest/globals";
import { prepareOrders } from "@/app/utils/prepareOrders";

describe("prepare orders", function () {
  it("should convert bids object to array", async function () {
    expect(
      prepareOrders(
        {
          1: 10,
          2: 20,
          3: 30,
        },
        "bids"
      )
    ).toEqual([
      [1, 10],
      [2, 20],
      [3, 30],
    ]);

    expect(
      prepareOrders(
        {
          1: 10,
          3: 30,
          2: 20,
        },
        "bids"
      )
    ).toEqual([
      [1, 10],
      [2, 20],
      [3, 30],
    ]);

    expect(
      prepareOrders(
        {
          1: 10,
          3: 30,
          2: 0,
        },
        "bids"
      )
    ).toEqual([
      [1, 10],
      [3, 30],
    ]);
  });

  it("should convert asks object to array", async function () {
    expect(
      prepareOrders(
        {
          1: 10,
          2: 20,
          3: 30,
        },
        "asks"
      )
    ).toEqual([
      [3, 30],
      [2, 20],
      [1, 10],
    ]);

    expect(
      prepareOrders(
        {
          1: 10,
          3: 30,
          2: 20,
        },
        "asks"
      )
    ).toEqual([
      [3, 30],
      [2, 20],
      [1, 10],
    ]);

    expect(
      prepareOrders(
        {
          1: 10,
          3: 30,
          2: 0,
        },
        "asks"
      )
    ).toEqual([
      [3, 30],
      [1, 10],
    ]);
  });
});
