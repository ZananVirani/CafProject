import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import colors from "../../constants/Colors";
import FoodBox from "@/components/FoodBox";
import { SafeAreaView } from "react-native-safe-area-context";
import CafAppBar from "@/components/CafAppBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function index() {
  const dimensions = useWindowDimensions();
  const testFoods = [
    ["Grilled Cheese Sandwich", 4.3],
    ["Hot Dog", 1.4],
    ["Popcorn Chicken", 3.1],
    ["Mac And Cheese", 3.8],
  ];
  const categories = ["Hot Food", "Interactive", "Other"];

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
          {categories.map((category) => {
            return (
              <>
                <View
                  style={{
                    paddingLeft: "3.5%",
                    width: dimensions.width,
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
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
                        name={item[0]}
                        rating={item[1]}
                        fontSize={12}
                        width={dimensions.width * 0.29}
                        minWidth={113.1}
                      />
                    );
                  })}
                </View>
              </>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
