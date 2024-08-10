import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="main_screen" options={{ headerShown: false }} />
      <Stack.Screen name="food_description" options={{ headerShown: false }} />
      <Stack.Screen name="cafeteria" options={{ headerShown: false }} />

      <Stack.Screen name="onboarding" options={{ headerShown: false }} />

      <Stack.Screen name="account" options={{ headerShown: false }} />
    </Stack>
  );
}
