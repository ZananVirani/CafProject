import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function splash_screen() {
  return (
    <ImageBackground
      source={require("../../assets/images/splash_background.jpg")}
      style={styles.bg}
    />
    // <View style={styles.bg}>
    //   <Text>splash_screen</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    objectFit: "cover",
    flex: 1,
  },
});
