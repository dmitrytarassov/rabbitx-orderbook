import fetch, { RequestInit } from "node-fetch";

export interface IResponse<T> extends Response {
  result: T[];
}

export async function postData<T>(
  url = "",
  data = {},
  headers = {}
): Promise<IResponse<T>> {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  };
  const response = await fetch(url, init);

  return (await response.json()) as IResponse<T>;
}
