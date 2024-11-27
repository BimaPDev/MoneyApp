import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTransactions } from "../../contexts/TransactionsContext";
import TotalDisplay from "../../components/transactions/TotalDisplay";
import TransactionList from "../../components/transactions/TransactionList";

export default function HomeScreen() {
  const { transactions, addTransaction } = useTransactions();

  // State for form inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Calculate total amount
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Handle adding a transaction
  const handleAddTransaction = () => {
    if (!title || !amount) {
      alert("Please fill out both fields.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive number for the amount.");
      return;
    }

    addTransaction({ title, amount: parsedAmount });

    // Clear inputs
    setTitle("");
    setAmount("");
  };

  return (
    <View style={styles.container}>
      {/* Total Display */}
      <TotalDisplay total={totalAmount} />

      {/* Transaction List */}
      <TransactionList transactions={transactions} />

      {/* Add Transaction Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Transaction Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Add Transaction" onPress={handleAddTransaction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
