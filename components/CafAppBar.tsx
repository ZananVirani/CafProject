import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import colors from "../constants/Colors";

const CafAppBar = () => {
  return (
    <View
      style={{
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "5%",
      }}
    >
      <View style={{ flex: 0.97, flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          color={colors.black}
          name="leftcircleo"
          size={30}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Sydenham Hall</Text>
      </View>
      <FontAwesome5
        color={colors.black}
        name="user-circle"
        size={33}
        onPress={() => router.back()}
      />
      <View style={{ flex: 0.03 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 30,
    fontWeight: "500",
    marginLeft: 15,
  },
});

export default CafAppBar;
