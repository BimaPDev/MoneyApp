import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { TransactionsProvider } from "../contexts/TransactionsContext";
import * as Font from "expo-font";

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "SFProDisplay-Regular": require("../assets/fonts/SFProDisplay-Regular.otf"),
      "SFProDisplay-Bold": require("../assets/fonts/SFProDisplay-Bold.otf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Change Later to use a custom loading screen
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <TransactionsProvider>
      <Slot />
    </TransactionsProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
