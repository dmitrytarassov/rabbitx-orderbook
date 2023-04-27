import { describe, it, expect, beforeAll } from "@jest/globals";
import { createCentrifuge } from "../src/app/utils/createCentrifuge";

const getToken = async () => {
  return "token";
};

describe("test createCentrifuge", function () {
  let centrifuge: any;
  beforeAll(() => {
    centrifuge = createCentrifuge(getToken);
  });

  it("should ", async function () {
    expect(typeof centrifuge).not.toEqual("undefined");
    expect(await centrifuge._getToken()).toEqual(await getToken());
  });
});
