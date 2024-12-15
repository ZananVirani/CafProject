/**
 * Profile Screen Button Component, to display account information, favourite foods, location, and learn more on the profile screen.
 */

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import colors from "@/constants/Colors";

export default function ProfileButton(props: any) {
  const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: colors.verylightgray,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        marginTop: 20,
      }}
    >
      {props.children}
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.darkgray,
    fontStyle: "italic",
    fontFamily: "inter",
    fontSize: 20,
    fontWeight: "semibold",
    marginLeft: 25,
  },
});
