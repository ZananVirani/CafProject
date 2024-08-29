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
import { Feather } from "@expo/vector-icons";

export default function PresetButton(props: {
  text: String;
  index: number;
  onPress: any;
  selected: boolean;
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
      {props.selected && (
        <>
          <View
            style={{
              width: dimensions.width * 0.35,
              height: 50,
              position: "absolute",
              backgroundColor: colors.black,
              opacity: 0.25,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <Feather
            name="check"
            size={40}
            style={{ position: "absolute" }}
            color={colors.darkgray}
          ></Feather>
        </>
      )}
      <Text style={{ fontFamily: "inter" }} numberOfLines={1}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
