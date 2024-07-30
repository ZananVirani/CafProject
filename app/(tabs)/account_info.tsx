import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Inter_400Regular } from "@expo-google-fonts/inter";

export default function AccountInfo() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 0.15 }}>
        <Text style={styles.title}>Account Setup</Text>
      </View>
      <View style={{ flex: 0.7 }}></View>
      <View style={{ flex: 0.15 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "medium",
    fontSize: 36,
    justifyContent: "center",
  },
});
