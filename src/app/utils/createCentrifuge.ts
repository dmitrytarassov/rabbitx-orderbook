import { Centrifuge } from "centrifuge";
import { wsURI } from "@/app/utils/constants";

export const createCentrifuge = (
  getToken: () => Promise<string>
): Centrifuge => {
  return new Centrifuge(wsURI, {
    getToken,
  });
};
