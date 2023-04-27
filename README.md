## Hello, Rabbitx team.

Glad to see you here. One of the tasks in request is explain the logic which I had while I was writing this code. So let's start.

### Task
Create a orderbook which gets data from rabbitx web socket. Optimize code. Be ready to huge amount of data.

### Solution
Of course web worker. But. Before start to work with web worker I have to understand how does this data work. It means that my first solution will be "to work with WS in browser, not in web worker".

But I'd like my code be clear and DRY. Then I need a common interface which describes the logic, realize InPage and WebSocket scripts which implement interface and get opportunity to switch realizations of this interface from InPage to WebWorker.

Ok, look here: `src/app/utils/OrderBookEmitter/IOrderBookEmitter.ts`

```typescript
export interface IOrderBookEmitter extends Emittery {
  addMarket(market: string): this;
  removeMarket(market: string): this;

  start(): this;
  stop(): this;
}
```

I used the Emittery library to make it observable. I plan to subscribe on new messages about orderbook change.

I realized abstract class with common logic: `src/app/utils/OrderBookEmitter/OrderBookEmitter.ts`
```typescript
export abstract class OrderBookEmitter
  extends Emittery
  implements IOrderBookEmitter
{
  markets: Set<string> = new Set<string>();
  orderBook: IMarketOrderBook = {};
  private interval: NodeJS.Timer;
  previousAverage: {
    [market: string]: number;
  } = {};

  start() {
    // code
  }

  stop() {
    // code
  }

  addMarket(market: string) {
    // code
  }

  removeMarket(market: string) {
    // code
  }

  tick() {
    const data: IOrderBookFullInfo = /* code */;

    this.emit("update", data);
  }
}
```

What we have to understand: there will be a lot of data. And we don't have to rerender our app every single time when new data comes. We can do that for example once per second. Method `tick` realizes that logic. Method `start` starts loop, method `stop` - stops loop. We have to stop the loop because when InPage script starts we have to stop WebWorker and vice versa.

Let's move on.

### InPage script
I realized the final class `src/app/utils/OrderBookEmitter/WebSocketOrderBookEmitter.ts`

```typescript
const centrifuge = createCentrifuge(async () => {
  // get token function
});

export class WebSocketOrderBookEmitter
  extends OrderBookEmitter
  implements IOrderBookEmitter
{
  active = false;

  constructor() {
    super();
    
    // specail method, the explanation will be below
    setInterval(this.sync, 10000);
  }

  start() {
    super.start();

    centrifuge.connect();

    // code

    this.active = true;

    return this;
  }

  stop(): this {
    super.stop();

    // code

    centrifuge.disconnect();

    this.active = false;

    return this;
  }

  sync() {
    if (this.active) {
      // I'd like to work with correct data
      // to realize that i want to stop socket and run it again
      // when we run it from scratch - we will get the new actual data
      this.stop().start();
    }
  }

  addMarket(market: string): this {
    // code
  }

  removeMarket(market: string): this {
    // code
  }

  removeSubscription(market: string) {
    // code
  }

  private setData(market: string, bids: TOrderBook, asks: TOrderBook) {
    // I moved the logic of merging orderbook with new data
    // to function because it will be repeated in the next realizations
    this.orderBook = prepareOrderBook(this.orderBook, market, bids, asks);
  }

  private updateSubscriptions() {
    // that's easy to read
    // get all markets
    this.markets.forEach((market) => {
      const chanelName = `orderbook:${market}`;
      // for each or them check that data's chanel is not exists
      if (!centrifuge.getSubscription(chanelName)) {
        const sub = centrifuge.newSubscription(chanelName);
        
        // add handler to storage
        // for get opportunity to remove it before destruction
        this.publicationHandlers[chanelName] = (
          response: PublicationContext
        ) => {
          this.setData(market, response.data.asks, response.data.bids);
        };
        
        // initialize subscribing
        sub.on("subscribed", (response) => {
          // save initial data
          this.setData(market, response.data.asks, response.data.bids);
          
          // subscribing for updates
          sub.on("publication", this.publicationHandlers[chanelName]);
        });
        // subscribing
        sub.subscribe();
      }
    });
  }
}
```

### Web Worker Subscription

The similar code I drew latter for work with Web Worker `src/app/utils/OrderBookEmitter/WebWorkerOrderBookEmitter.ts`
```typescript
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
  
  // describe the slistener method, to get opportunity to remove it
  listener = (event: MessageEvent<any>) => {
    const { action, data } = event.data;

    switch (action) {
      // code
      case "message":
        // console.log(`Received message from channel ${channel}:`, data);
        this.emit("update", data);
        break;
      // code
    }
  };

  start() {
    // subsctibe
    this.centrifugeWorker.addEventListener("message", this.listener);

    // Connect to Centrifuge server
    this.centrifugeWorker.postMessage({ action: "connect" });

    // code
  }

  stop(): this {
    // code
    // unsubscribe
    this.centrifugeWorker.removeEventListener("message", this.listener);
    
    // disconnect
    this.centrifugeWorker.postMessage({
      action: "disconnect",
    });
    // code
  }

  addMarket(market: string): this {
    // code
  }

  removeMarket(market: string): this {
    // code
  }

  removeSubscription(market: string) {
    // post message about unsubscribing
    const chanelName = `orderbook:${market}`;
    this.centrifugeWorker.postMessage({
      action: "unsubscribe",
      data: { channel: chanelName },
    });
  }

  private updateSubscriptions() {
    // get all markets
    this.markets.forEach((market) => {
      const chanelName = `orderbook:${market}`;
      
      // for each of them send subscribe event
      this.centrifugeWorker.postMessage({
        action: "subscribe",
        data: { channel: chanelName },
      });
    });
  }
}
```

Seems like now I have to show the web worker code, so it is: `src/web_worker/web_worker.ts`
```typescript
const centrifuge = createCentrifuge(async () => {
  // get token code
});

// the similar code like in InPage
let orderBook: IMarketOrderBook = {};
const previousAverage: {
  [market: string]: number;
} = {};

const tick = () => {
  const data: IOrderBookFullInfo = /* code */;
  
  // post message from worker
  self.postMessage({ action: "message", data });
};

// the same
let interval: NodeJS.Timer;

// the same
const setData = (market: string, bids: TOrderBook, asks: TOrderBook) => {
  orderBook = prepareOrderBook(orderBook, market, bids, asks);
};

self.addEventListener("message", (event) => {
  const { action, data } = event.data;
  const channel = (data && data.channel) || "";
  const [, market] = channel.split(":");
  
  // init WS listener
  const onPublication = (response: PublicationContext) => {
    setData(market, response.data.asks, response.data.bids);
  };
  
  switch (action) {
    case "subscribe":
      // the same
      if (!centrifuge.getSubscription(channel)) {
        const sub = centrifuge.newSubscription(channel);

        sub.on("subscribed", (response) => {
          setData(market, response.data.asks, response.data.bids);

          sub.on("publication", onPublication);
        });
        sub.subscribe();
      }

      break;

    case "unsubscribe":
      // the same
      const sub = centrifuge.getSubscription(channel);
      if (sub) {
        sub.off("publication", onPublication);
        centrifuge.removeSubscription(sub);
      }
      break;

    case "connect":
      // the same as start method
      centrifuge.connect();
      interval = setInterval(() => {
        tick();
      }, 1000);
      break;

    case "disconnect":
      // the same as stop method
      centrifuge.disconnect();
      clearInterval(interval);
      break;
  }
});
```
But it is typescript, I have to build it. I added `esbuild` because it works very fast. One think: I have to override "target" in "tsconfig", and created the `tsconfig-web-worker.json` file. Run `yarn build:worker` and the file `web-worker.js` is created.

### Frontend
It's a Next.js, nothing uncommon. I like context in react so I created a provider `OrderBook.provider.tsx` where I realized th main logic.
```tsx
interface OrderBookProviderProps {
  children: React.ReactNode;
}

export interface IOrderBookContext {
  // code
}

export const OrderBookContext = createContext<IOrderBookContext>({
 // code
});

// we have to understand how many watchers for concrete market do we have right now
// Why?
// There can be 2, 3, 4 ... many orderbooks in one page, not only one.
// and each of the can show the same market
// then we have to count them
const watchersCount: {
  [market: string]: { count: number; active: boolean };
} = {};

const webSocketOrderBookEmitter = new WebSocketOrderBookEmitter();
const webWorkerOrderBookEmitter = new WebWorkerOrderBookEmitter();

const OrderBookProvider: React.FC<OrderBookProviderProps> = ({ children }) => {
  const [mode, set_mode] = React.useState<WebSocketOrWebWorker>("web_socket");
  const [orderBook, set_orderBook] = React.useState<
    IOrderBookContext["orderBook"]
    >({});
  const [orderBookEmitter, set_orderBookEmitter] =
    React.useState<IOrderBookEmitter>(webSocketOrderBookEmitter);

  const watch = (market: string) => {
    // start watch the market
    if (market !== "none") {
      if (!watchersCount[market]) {
        watchersCount[market] = {
          count: 1,
          active: false,
        };
      } else {
        watchersCount[market].count += 1;
      }
    }
    update();
  };

  const unwatch = (market: string) => {
    // stop watch the market
    if (market !== "none") {
      watchersCount[market].count -= 1;
      update();
    }
  };

  const update = (forceUpdate = false) => {
    // I moved update to function and call it from watch and unwatch
    // I dont use useEffect here because there can be a lot of data
    // and a lot of rerenders - we don't need that
    Object.keys(watchersCount).forEach((market) => {
      const element = watchersCount[market];
      // for each of markets we check count of watchers
      if ((element.count > 0 && !element.active) || forceUpdate) {
        // and if count > 0 and watcher is not active
        // we add activate it
        orderBookEmitter.addMarket(market);
        element.active = true;
      } else if (element.count === 0 && element.active) {
        // if count == 0 and it was active
        // we deactivate it
        orderBookEmitter.removeMarket(market);
        element.active = false;
      }
    });
  };
  
  // watch for orderBookEmitter change
  React.useEffect(() => {
    if (orderBookEmitter) {
      // start it
      orderBookEmitter.start();
      // subscribe for updates
      orderBookEmitter.on("update", (data: IOrderBookContext["orderBook"]) => {
        // hm!! seems like smth can go wrong
        // check the incomming data to avoid wrong rerenders
        if (Object.keys(data).length > 0) {
          set_orderBook(data);
        }
      });
      // force update data, because we know
      // that data can be missed
      update(true);
    }

    return () => {
      if (orderBookEmitter) {
        // stop on desctruct
        orderBookEmitter.stop();
      }
    };
  }, [orderBookEmitter]);

  const updateMode = (mode: WebSocketOrWebWorker) => {
    if (mode === "web_socket") {
      // stop WebWorker
      webWorkerOrderBookEmitter.stop();
      set_orderBookEmitter(webSocketOrderBookEmitter);
    } else {
      // stop InPage
      webSocketOrderBookEmitter.stop();
      set_orderBookEmitter(webWorkerOrderBookEmitter);
    }
    set_mode(mode);
  };

  return (
    <OrderBookContext.Provider
      value={{
        orderBook,
        watch,
        unwatch,
        updateMode,
        mode,
      }}
    >
      {children}
    </OrderBookContext.Provider>
  );
};

export default OrderBookProvider;
```

### Backend (get auth token)
There is only one endpoint `src/app/api/token/route.ts`, which creates JWT token and returns it.

```typescript
interface ApiResponse {
  jwt: string;
}

export async function GET() {
  // get tinestamp
  const timestamp = expirationTimestamp.expirationTimestamp;
  
  // preapare signature
  const { preparedSignature } = await prepareSignature(
    authMessage,
    timestamp,
    accountPrivateKey
  );
  
  // fetch the data
  const data: IResponse<ApiResponse> = await postData<ApiResponse>(
    `${apiURI}/onboarding`,
    {
      signature: preparedSignature,
      wallet,
      isClient: false,
    },
    {
      "RBT-TS": timestamp,
      "RBT-API-KEY": RBT_API_KEY,
    }
  );
  
  // UH! yes we have to check response, and be sure thai it is correct. 
  // We can improve that in future, realy!
  // But for today it is enough
  const token = data?.result?.[0]?.jwt;

  return new Response(JSON.stringify({ token }));
}
```
Telling the truth if was painful. There were no documentation about getting JWT token. I parsed python code from `rabbitx.client` and `rabbitx` libs. And checking examples I had:

1 - correct token to work with WS
```python
if __name__ == '__main__':
    private_key = '0x0000000000000000000000000000000000000000000000000000000001221104' # change this to your private key
    testnet=True # change this to False if using on mainnet
    if testnet:
        client = Client(api_url=const.TESTNET_URL, private_key=private_key) 
    else:
        client = Client(api_url=const.URL, private_key=private_key)
    client.onboarding.onboarding()
    
    print(client.onboarding.session._jwt)
```

2 - code to sign message. I didn't understand why it is called `MetamaskVerifyRequest`. I think `EthersVerifyRequest` is better.

I rewrote this code to typescript and... I had the error with checking signature. 2 hours I spent to find the place where smth goes wrong. And it is.

I have added the line and forgot about it. Ok, my mistake. [doc](https://docs.ethers.org/v5/api/utils/bytes/#utils-hexDataSlice)
```typescript
const message = ethers.utils.hexDataSlice(ethers.utils.id(messageToSign), 0);
```

### Finalize
To work with data I transform an array `[number, number][]` to object 
```typescript
interface IOrders {
  [price: number]: number;
}
```
Because working with object is faster than with array. If new data is coming I just have to:
```typescript
const updateData = (newData: IOrders, oldData: IOrders): IOrders => {
  return {
    ...oldData,
    ...newData,
  }
}
```
That's easier and faster than work with arrays. Look to `src/app/utils/prepareOrderBook.ts`. I prefer to not use libs like `immutable.js` because they work slowly and in this case I can create my own code, it will be less readable but faster.
```typescript
export const prepareOrderBook = (
  orderBook: IMarketOrderBook,
  market: string,
  bids: TOrderBook,
  asks: TOrderBook
): IMarketOrderBook => {
  return {
    ...orderBook,
    [market]: {
      bids: {
        ...(orderBook[market]?.bids || {}),
        ...bids.reduce((acc: IOrders, [price, value]) => {
          acc[price] = value;
          return acc;
        }, {}),
      },
      asks: {
        ...(orderBook[market]?.asks || {}),
        ...asks.reduce((acc: IOrders, [price, value]) => {
          acc[price] = value;
          return acc;
        }, {}),
      },
    },
  };
};
```

So I store the data in `TOrderBook` type in watchers and transform it to `[number, number][]` only before emitting the update event.

### A bit more about frontend
Css (scss) modules. Faster to build than any other solution.

Context - easier to write code. I like redux (with lens) and saga, but there are a couple of Observable classes, I think that context is better here.

Saga - I like saga, I think that saga is another solution, because we can fork the saga and in child saga we can start work with WS. I'm not sure that that code will be more simple that context, no! It will be unreadable hell. May be. Or not. I know only one - it will be fast too. May be I'll try.

### What to add
Error handlers. You can see that there is no one error handler in app. Not in Web Worker, not in WS, nowhere. That's bad. We have to handle every single error.

More tests. May be when you are writing this document there is 100% coverage may be not, but I hope tha I'll do that.
# Resume
Guys, thank you. It was amazing task! First of all because there were no doc for TS. I refreshed my python knowledge, it was interesting experience. Also I'd like to say that task about web workers - that's cool. I like to work with WW - it is one of the best features in web2.

One think I did not understand: may be you wanted me to realize signing a message and authorization on client side? It wasn't clear, and I did it on backend, using the secret key from example (or I suppose I could use any new Account, generating it in realtime).

I hope that you are enjoying my code and my explanation. Thank you fore reading. Bye! 

# Next.js doc

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
