// Use WebSocket transport endpoint.
import { Centrifuge } from "centrifuge";

const centrifuge = new Centrifuge("wss://api.prod.rabbitx.io/ws", {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxODQxIiwiZXhwIjoxNjgyNjAyMDk0fQ.mNWI9DPM_u2IjLQCkMeZTE-tvRwODBwxuYw6c13uX1Q",
});

// // Allocate Subscription to a channel.
// const sub = centrifuge.newSubscription("news");
//
// // React on `news` channel real-time publications.
// sub.on("publication", function (ctx) {
//   console.log(ctx.data);
// });
//
// // Trigger subscribe process.
// sub.subscribe();
//
// // Trigger actual connection establishement.
// centrifuge.connect();

export const useWS = () => {
  const authenticate = () => {
    // centrifuge.au
  };
  return { centrifuge, authenticate };
};
