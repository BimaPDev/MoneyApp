import { View, Text, Button, StyleSheet } from "react-native";
import { useTransactions } from "../../contexts/TransactionsContext";

export default function HomeScreen() {
  const { transactions, addTransaction } = useTransactions();

  return (
    <View style={styles.container}>
      <Text>Transactions:</Text>
      {transactions.map((transaction, index) => (
        <Text key={index}>
          {transaction.title}: ${transaction.amount}
        </Text>
      ))}
      <Button
        title="Add Transaction"
        onPress={() => addTransaction({ title: "Groceries", amount: 50 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
