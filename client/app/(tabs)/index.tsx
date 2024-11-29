import React, { useState } from "react";
import { Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../../contexts/TransactionsContext";
import TotalDisplay from "../../components/transactions/TotalDisplay";
import TransactionList from "../../components/transactions/TransactionList";
import { v4 as uuidv4 } from "uuid";

// use the TransactionsContext to display the total amount and the list of transactions
export default function HomeScreen() {
  const { transactions, addTransaction } = useTransactions();

  // State for form inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const id = uuidv4();

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

    addTransaction({
      id: uuidv4(), // Generate unique ID
      title: title.trim(),
      amount: parsedAmount,
    });

    // Clear inputs
    setTitle("");
    setAmount("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Total Display */}
      <TotalDisplay total={totalAmount} />

      {/* Transaction List */}
      <TransactionList transactions={transactions} />

      {/* Add Transaction Form */}
      <SafeAreaView style={styles.form}>
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
      </SafeAreaView>
    </SafeAreaView>
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
