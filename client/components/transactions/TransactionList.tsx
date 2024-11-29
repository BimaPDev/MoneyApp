import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useTransactions } from "../../contexts/TransactionsContext";

interface Transaction {
  id: string;
  title: string;
  amount: number;
}

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  const { deleteTransaction } = useTransactions();

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id} // Use `id` as the key
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteTransaction(item.id)} // Delete transaction
              />
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
    width: "100%",
    paddingHorizontal: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransactionList;
