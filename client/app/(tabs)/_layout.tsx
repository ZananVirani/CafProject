/**
 * Using React Navigation, this layout is used to define the screens that are used in the app.
 * Header is hidden for all screens.
 */

import React from "react";

import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import MainScreen from "./main_screen";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen name="main_screen" options={{ headerShown: false }} />
      <Stack.Screen name="cafeteria" options={{ headerShown: false }} />
      <Stack.Screen name="food_description" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="preview" options={{ headerShown: false }} />
      <Stack.Screen name="favourites" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ headerShown: false }} />
      <Stack.Screen name="preset" options={{ headerShown: false }} />
      <Stack.Screen name="upload" options={{ headerShown: false }} />
      <Stack.Screen name="item_select" options={{ headerShown: false }} />
    </Stack>
  );
}
