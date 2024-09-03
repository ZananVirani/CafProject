import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import { getUserID } from "@/utils/AsyncStorage";

export default function index() {
  useEffect(() => {
    getUserID()
      .then((value) => {
        value
          ? router.replace("/(tabs)/main_screen")
          : router.replace("/(tabs)/onboarding");
      })
      .catch((e) => console.log(e));
  });
  return <View style={{ flex: 1, backgroundColor: "white" }}></View>;
}

const styles = StyleSheet.create({});
