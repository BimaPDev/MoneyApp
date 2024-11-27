import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTransactions } from "../contexts/TransactionsContext";

const HomeScreen = () => {
  const { transactions } = useTransactions();

  // Calculate the total dynamically
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: ${totalAmount.toFixed(2)}</Text>{" "}
      {/* Total */}
      <Text style={styles.title}>Transactions:</Text>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text>{item.title}</Text>
              <Text>${item.amount.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default HomeScreen;
