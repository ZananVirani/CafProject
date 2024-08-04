import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
} from "react-native";
import { ABeeZee_400Regular } from "@expo-google-fonts/abeezee";

import Colors from "@/constants/Colors";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
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
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={24}
          color={"black"}
        />
      </TouchableOpacity>
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
