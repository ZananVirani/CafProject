import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import colors from "../../constants/Colors";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileScreen() {
  const dimensions = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "7%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              width: dimensions.width,
            }}
          >
            <AntDesign
              color={colors.black}
              name="leftcircleo"
              size={30}
              onPress={() => router.back()}
            />
            <Text style={styles.title}>User Settings</Text>
          </View>
        </View>
        <View style={{ flex: 0.78 }}>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
            }}
          >
            <Text style={styles.subtitle}>Food Restrictions?</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "7%",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          ></View>
        </View>
        <View style={{ flex: 0.12 }}>
          <CustomButton
            onPress={() => {
              router.push("/(tabs)/cafeteria");
            }}
            borderRadius={16}
            buttonColor={colors.wpurple}
          >
            Get Started
          </CustomButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 33,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
    marginRight: 15,
  },

  subtitle: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "regular",
    fontSize: 24,
    marginLeft: "12%",
    marginRight: 10,
  },
  text: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "regular",
    fontSize: 16,
    marginLeft: "12%",
    marginRight: 10,
    fontStyle: "italic",
  },
});
