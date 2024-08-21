import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import colors from "@/constants/Colors";

type ButtonProps = {
  marginVertical?: number;
  buttonColor?: string;
  onPress: any;
  marginHorizontal?: any;
  marginTop?: any;
  height?: number;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  borderColor?: string;
  borderRadius?: number;
  children: any;
  width?: number | `${number}%`;
  fontWeight?: any;
  lSpacing?: number;
  disabled?: boolean;
  style?: object;
};

export default function CustomButton(props: ButtonProps) {
  return (
    <Button
      onPress={props.onPress}
      mode="contained"
      buttonColor={props.buttonColor ?? colors.lpurple}
      disabled={props.disabled}
      style={{
        ...props.style,
        width: props.width,
        height: props.height ?? 60,
        marginHorizontal: props.marginHorizontal ?? "10%",
        justifyContent: "center",
        borderColor: props.borderColor,
        borderWidth: props.borderColor ? 1 : undefined,
        borderRadius: props.borderRadius,
        marginVertical: props.marginVertical,
        marginTop: props.marginTop,
      }}
    >
      <Text
        style={{
          fontSize: props.fontSize ?? 20,
          fontFamily: props.fontFamily ?? "ABeeZee_400Regular",
          color: props.textColor ?? "white",
          fontWeight: props.fontWeight ?? "bold",
          padding: 0,
          letterSpacing: props.lSpacing,
        }}
      >
        {props.children}
      </Text>
    </Button>
  );
}
