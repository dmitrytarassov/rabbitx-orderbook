import OrderBookProvider from "@/app/providers/OrderBook.provider";
import Home from "@/app/pages/Home/Home";

export default function HomePage() {
  return (
    <OrderBookProvider>
      <Home />
    </OrderBookProvider>
  );
}
