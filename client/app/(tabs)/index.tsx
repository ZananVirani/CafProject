import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";

export default function index() {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      loggedIn
        ? router.replace("/(tabs)/main_screen")
        : router.replace("/(tabs)/onboarding");
    }, 1500);
  });
  return <View style={{ flex: 1, backgroundColor: "white" }}></View>;
}

const styles = StyleSheet.create({});
