import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import colors from "@/constants/Colors";

export default function PresetButton(props: {
  text: string;
  index: number;
  onPress: any;
}) {
  const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      style={{
        width: dimensions.width * 0.35,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: props.index % 2 == 0 ? dimensions.width * 0.1 : 0,
        borderRadius: 5,
        backgroundColor: colors.verylightgray,
        borderWidth: 1,
        borderColor: colors.darkgray,
        marginBottom: 20,
        paddingHorizontal: 7,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{ fontFamily: "inter", fontWeight: "semibold" }}
        numberOfLines={1}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
