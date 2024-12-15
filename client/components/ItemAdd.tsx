/**
 * ItemAdd component used in the preset screen, to either push to either upload screen or item_select screen.
 */

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function ItemAdd(props: any) {
  const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ marginRight: props.marginRight }}
    >
      <View
        style={{
          width: dimensions.width * 0.35,
          height: dimensions.width * 0.3,
          backgroundColor: colors.wpurple,
          borderTopRightRadius: 14,
          borderTopLeftRadius: 14,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo
          name={props.iconName}
          color={colors.verylightgray}
          size={props.iconName == "plus" ? 60 : 43}
        ></Entypo>
      </View>
      <View
        style={{
          width: dimensions.width * 0.35,
          height: dimensions.width * 0.1,
          borderBottomRightRadius: 14,
          borderBottomLeftRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.verylightgray,
          borderWidth: 1,
          borderColor: colors.gray,
        }}
      >
        <Text style={{ fontStyle: "italic", fontFamily: "inter" }}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
