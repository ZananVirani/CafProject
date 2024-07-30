import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import colors from "@/constants/Colors";

type ButtonProps = {
  buttonColor?: string;
  onPress: any;
  marginHorizontal?: any;
  height?: number;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  borderColor?: string;
  borderRadius?: number;
  children: any;
  width?: number;
};

export default function CustomButton(props: ButtonProps) {
  return (
    <Button
      onPress={props.onPress}
      mode="contained"
      buttonColor={props.buttonColor ?? colors.lpurple}
      style={{
        width: props.width ?? undefined,
        height: props.height ?? 60,
        marginHorizontal: props.marginHorizontal ?? "10%",
        justifyContent: "center",
        borderColor: props.borderColor,
        borderRadius: props.borderRadius,
      }}
    >
      <Text
        style={{
          fontSize: props.fontSize ?? 20,
          fontFamily: props.fontFamily ?? "ABeeZee_400Regular",
          color: props.textColor ?? "white",
          fontWeight: "bold",
        }}
      >
        {props.children}
      </Text>
    </Button>
  );
}
