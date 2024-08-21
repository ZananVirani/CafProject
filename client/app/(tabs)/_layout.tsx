import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import Login from "./login";
import OnBoarding from "./onboarding";
import AccountInfo from "./account";
import MainScreen from "./main_screen";
import Cafeteria from "./cafeteria";
import FoodDescription from ".";
import ProfileScreen from "./profile";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="favourites" options={{ headerShown: false }} />
      <Stack.Screen name="upload" options={{ headerShown: false }} />
      <Stack.Screen name="main_screen" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="cafeteria" options={{ headerShown: false }} />
      <Stack.Screen name="presets" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />

      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerShown: false }} />
    </Stack>
  );
}