import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import AccountInfo from "./account";
import { Stack } from "expo-router";
import OnBoarding from ".";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerShown: false }} />
    </Stack>
  );
}
