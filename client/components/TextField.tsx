import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import colors from "../constants/Colors";

export default function TextField(props: {
  placeText: string;
  style?: object;
  marginTop?: any;
  onChangeText: any;
}) {
  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder={props.placeText}
        placeholderTextColor={colors.gray}
        onChangeText={props.onChangeText}
        activeOutlineColor={colors.wpurple}
        outlineColor={colors.verylightgray}
        textColor="black"
        theme={{ roundness: 50 }}
        style={{
          ...props.style,
          backgroundColor: colors.verylightgray,
          marginHorizontal: "10%",
          marginTop: props.marginTop,
        }}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({});
