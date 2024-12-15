/**
 * Component for the main cafeteria box on the main screen.
 */

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import colors from "@/constants/Colors";

export default function MainCafBox(props: any) {
  // Dimensions of the window
  const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{ borderRadius: 12, marginRight: 20 }}
      onPress={props.onPress}
    >
      <Image
        source={props.source}
        style={{
          flex: 1,
          width: dimensions.width * 0.55,
          borderRadius: 12,
          opacity: 1,
          borderWidth: 0.7,
          borderColor: colors.wpurple,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 25,
          backgroundColor: colors.wpurple,
          height: dimensions.height * 0.06,
          right: 20,
          left: 20,
          borderRadius: 12,
          padding: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[styles.text, { fontSize: 19 }]}
            adjustsFontSizeToFit={true}
          >
            {props.cafName}
          </Text>
        </View>
        <View></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "inter",
    color: colors.white,
    fontStyle: "italic",
  },
});
