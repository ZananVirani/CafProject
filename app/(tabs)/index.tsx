import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constants/Colors";
import { router } from "expo-router";

export default function index() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Text onPress={() => router.push("(tabs)/cafeteria")}>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
