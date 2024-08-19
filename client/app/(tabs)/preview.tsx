import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../constants/Colors";
import FoodBox from "@/components/FoodBox";
import { SafeAreaView } from "react-native-safe-area-context";
import CafAppBar from "@/components/CafAppBar";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Toggle from "@imcarlosguerrero/react-native-switch-toggle";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

export default function Preview() {
  const dimensions = useWindowDimensions();
  const testFoods = [
    ["Grilled Cheese Sandwich", 4.3],
    ["Hot Dog", 1.4],
    ["Popcorn Chicken", 3.1],
    ["Mac And Cheese", 3.8],
  ];
  const categories = ["Hot Food", "Interactive"];
  const [toggle, setToggle] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
          <Text style={styles.title} numberOfLines={1}>
            Preview
          </Text>
        </View>
      </View>
      <ScrollView>
        {categories.map((category, index) => {
          return (
            <View key={category}>
              <View
                style={{
                  paddingLeft: "3.5%",
                  width: dimensions.width,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 23,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 23,
                    fontFamily: "inter",
                    fontWeight: "500",
                    marginLeft: 8,
                  }}
                >
                  {category}
                </Text>
                <MaterialCommunityIcons
                  name={
                    category == "Hot Food"
                      ? "fire" //
                      : category == "Interactive"
                      ? "food-turkey" //"filter"
                      : "star-circle"
                  }
                  size={category == "Other" ? 32 : 37}
                  color={colors.black}
                  style={{
                    width: 35,
                    marginLeft: category == "Hot Food" ? 5 : 10,
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: "1.3%",
                  flexWrap: "wrap",
                }}
              >
                {testFoods.map((item) => {
                  return (
                    <FoodBox
                      onPress={() => {}}
                      key={item}
                      name={item[0]}
                      rating={item[1]}
                      fontSize={12}
                      width={dimensions.width * 0.29}
                      minWidth={113.1}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
        <View style={{ marginVertical: 30 }}>
          <CustomButton
            onPress={() => {}}
            borderRadius={14}
            marginVertical={0}
            buttonColor={colors.darkgray}
          >
            Save As New & Upload
          </CustomButton>

          <CustomButton
            onPress={() => {}}
            borderRadius={14}
            marginVertical={20}
          >
            Save & Upload
          </CustomButton>

          <CustomButton
            onPress={() => {}}
            borderRadius={14}
            marginVertical={0}
            buttonColor={colors.wpurple}
          >
            Temporary Upload
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.wpurple,
    fontSize: 20,
    fontWeight: "medium",
    lineHeight: 35,
  },
  subtext: {
    color: colors.wpurple,
    fontSize: 13.5,
    fontWeight: "medium",
    lineHeight: 17,
    letterSpacing: -0.5,
  },
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 33,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
    marginRight: 15,
  },
});

// TODO: Add Name Dialog For New Name Preset
