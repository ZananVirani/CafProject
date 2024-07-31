import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import OnBoarding from "./onboarding";
import AccountInfo from "./account_info";
import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <AccountInfo />
    </Provider>
  );
  // <Tabs
  //   screenOptions={{
  //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
  //     headerShown: false,
  //   }}
  // >
  //   <Tabs.Screen
  //     name="index"
  //     options={{
  //       title: "Home",
  //       tabBarIcon: ({ color, focused }) => (
  //         <TabBarIcon
  //           name={focused ? "home" : "home-outline"}
  //           color={color}
  //         />
  //       ),
  //     }}
  //   />
  //   <Tabs.Screen
  //     name="explore"
  //     options={{
  //       title: "Explore",
  //       tabBarIcon: ({ color, focused }) => (
  //         <TabBarIcon
  //           name={focused ? "code-slash" : "code-slash-outline"}
  //           color={color}
  //         />
  //       ),
  //     }}
  //   />
  // </Tabs>
}
