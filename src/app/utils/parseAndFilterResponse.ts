import { IOrderBookData } from "@/app/dtos/IOrderBookData";
import { PublicationContext } from "centrifuge/build/types";

export const parseAndFilterResponse =
  (step: number, callback: (fn: IOrderBookData) => void) =>
  (response: PublicationContext) => {
    const data = response.data as IOrderBookData;
    if (data.sequence % step === 0) {
      callback(data);
    }
  };
