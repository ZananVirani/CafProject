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
          height: dimensions.height * 0.078,
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
            alignContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <Text
            style={[
              styles.text,
              { fontSize: 17, position: "absolute", top: 0 },
            ]}
          >
            {props.cafName}
          </Text>
          <View
            style={{ flexDirection: "row", position: "absolute", bottom: 0 }}
          >
            <Ionicons color={colors.white} name="star" size={15} />
            <Text style={[styles.text, { marginLeft: 5 }]}>
              {props.rating.toFixed(1)}
            </Text>
          </View>
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
  },
});
