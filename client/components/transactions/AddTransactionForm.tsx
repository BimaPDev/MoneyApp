import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTransactions } from "../../contexts/TransactionsContext";
import { v4 as uuidv4 } from "uuid";

const AddTransactionForm = () => {
  const [item, setItem] = useState(""); // State for the item name
  const [amount, setAmount] = useState(""); // State for the transaction amount
  const id = uuidv4(); // Generate a random ID for the transaction

  // Get the `addTransaction` function from the context
  const { addTransaction } = useTransactions();

  // Handle form submission
  const handleSubmit = () => {
    if (!item || !amount) {
      Alert.alert("Error", "Please fill out both fields.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert(
        "Error",
        "Please enter a valid positive number for the amount."
      );
      return;
    }

    addTransaction({ id, title: item, amount: parsedAmount });

    // Reset the form fields
    setItem("");
    setAmount("");

    Alert.alert("Success", "Transaction added!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={item}
        onChangeText={setItem}
      />
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Add Transaction" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default AddTransactionForm;
