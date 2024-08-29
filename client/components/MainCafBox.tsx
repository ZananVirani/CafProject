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
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ABeeZee_400Regular_Italic } from "@expo-google-fonts/abeezee";

export default function MainCafBox(props: any) {
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
      {/* <MaterialCommunityIcons
        color={props.liked ? colors.wpurple : colors.gray}
        name={"heart-circle"}
        size={50}
        onPress={props.onPress}
        style={{
          position: "absolute",
          right: 20,
          top: 20,
        }}
      /> */}
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
