import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalDisplay = ({ total }: { total: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default TotalDisplay;
