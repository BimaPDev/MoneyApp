import { Slot } from "expo-router";
import { TransactionsProvider } from "../contexts/TransactionsContext";

export default function Layout() {
  return (
    <TransactionsProvider>
      <Slot />
    </TransactionsProvider>
  );
}
