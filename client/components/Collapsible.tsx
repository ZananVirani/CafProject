/**
 * Collapsible component, which can be used to hide and show content
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  // State to keep track of whether the collapsible is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ marginHorizontal: "2%", marginTop: 10 }}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>{title}</Text>
        <Ionicons
          // Change the icon according to whether the collapsible is open or closed
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={24}
          color={"black"}
        />
      </TouchableOpacity>
      {/* Show the content in only if the collapsible is open */}
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "ABeeZee_400Regular",
    fontSize: 24,
    fontWeight: "medium",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: { flexDirection: "row", flexWrap: "wrap" },
});
