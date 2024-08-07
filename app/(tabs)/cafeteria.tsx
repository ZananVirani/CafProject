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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toggle from "@imcarlosguerrero/react-native-switch-toggle";
import { router } from "expo-router";

export default function index() {
  const dimensions = useWindowDimensions();
  const testFoods = [
    ["Grilled Cheese Sandwich", 4.3],
    ["Hot Dog", 1.4],
    ["Popcorn Chicken", 3.1],
    ["Mac And Cheese", 3.8],
  ];
  const categories = ["Hot Food", "Interactive", "Other"];
  const [toggle, setToggle] = useState(false);

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: colors.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <CafAppBar />
        <ScrollView>
          <View
            style={{
              width: dimensions.width,
              backgroundColor: colors.verylightgray,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.57,
                borderRightColor: colors.gray,
                borderRightWidth: 2,
                borderStyle: "solid",
                paddingLeft: 15,
                paddingTop: 13,
                paddingBottom: 20,
                paddingRight: 5,
              }}
            >
              <Text style={styles.text}>Regular Hours:</Text>
              <Text style={styles.subtext}>Weekdays: 7:30am - 11:00pm</Text>
              <Text style={styles.subtext}>Weekends: 7:30am - 7:30pm</Text>
            </View>
            <View
              style={{
                flex: 0.43,
                paddingHorizontal: 10,
                paddingTop: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.wpurple,
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: 40,
                }}
              >
                Show Restrictions:
              </Text>
              <Toggle
                circleColorOff={colors.white}
                circleColorOn={colors.white}
                backgroundColorOff={colors.gray}
                backgroundColorOn={colors.wpurple}
                switchOn={toggle}
                onPress={() => setToggle(!toggle)}
                containerStyle={{
                  width: dimensions.width * 0.17,
                  height: dimensions.width * 0.07,
                  borderRadius: 50,
                }}
                circleStyle={{
                  width: dimensions.width * 0.07,
                  height: dimensions.width * 0.07,
                  borderRadius: 50,
                }}
              />
            </View>
          </View>
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
                  <MaterialCommunityIcons
                    name={
                      category == "Hot Food"
                        ? "fire" //
                        : category == "Interactive"
                        ? "food-turkey" //"filter"
                        : "dots-horizontal-circle"
                    }
                    size={category == "Other" ? 32 : 37}
                    color={colors.black}
                    style={{ width: 35 }}
                  />
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
                        onPress={() => {
                          router.push("(tabs)/food_description");
                        }}
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
        </ScrollView>
      </SafeAreaView>
    </View>
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
});
