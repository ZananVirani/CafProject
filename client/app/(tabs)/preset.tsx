import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { TextInput } from "react-native-paper";
import FoodBox from "@/components/FoodBox";
import ItemAdd from "@/components/ItemAdd";

export default function Preset() {
  const dimensions = useWindowDimensions();

  const categories = ["Hot Food", "Interactive"];
  const testFoods = [
    { name: "Pina Colada", rating: 3.8 },
    { name: "Grilled Cheese", rating: 3.8 },
    { name: "Other Item", rating: 1.4 },
    { name: "Hot Dog", rating: 3.8 },
    { name: "Somethign else", rating: 5.0 },
    { name: "Wordd", rating: 4.2 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "7%",
            marginBottom: "3%",
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
              New Menu
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              width: dimensions.width,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
              flexDirection: "row",
            }}
          >
            <ItemAdd
              onPress={() => {}}
              text="Create New Item"
              marginRight={30}
              iconName="plus"
            />
            <ItemAdd
              onPress={() => {}}
              text="Choose Item"
              iconName="mouse-pointer"
            />
          </View>

          {categories.map((category) => {
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
                  {testFoods.map((item, index) => {
                    return (
                      <FoodBox
                        onPress={() => {
                          //router.push("(tabs)/food_description");
                        }}
                        key={index}
                        name={item.name}
                        rating={item.rating}
                        fontSize={12}
                        width={dimensions.width * 0.29}
                        minWidth={113.1}
                        onDelete={() => {}}
                      />
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
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
});
