import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Transaction {
  title: string;
  amount: number;
}

const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <View style={styles.container}>
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
    width: "100%",
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TransactionList;
