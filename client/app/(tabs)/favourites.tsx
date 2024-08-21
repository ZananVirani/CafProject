import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { TextInput } from "react-native-paper";
import FoodBox from "@/components/FoodBox";

export default function Favourites() {
  const dimensions = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [filterChosen, setFilterChosen] = useState("Favs");
  const categories = ["Favs", "All "];
  const [finalFoods, setFinalFoods] = useState([{ name: "", rating: 0 }]);

  const allItems = [
    { name: "Pina Colada", rating: 3.8 },
    { name: "Grilled Cheese", rating: 3.8 },
    { name: "Other Item", rating: 3.8 },
    { name: "Hot Dog", rating: 3.8 },
  ];
  const favItems = [
    { name: "Pina Colada", rating: 3.8 },
    { name: "Something Else", rating: 3.8 },
  ];

  useEffect(() => {
    let tempFoods = filterChosen == categories[0] ? favItems : allItems;

    setFinalFoods(
      tempFoods.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, filterChosen]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
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
              <Text style={styles.title}>Favourite Foods</Text>
            </View>
          </View>
          <View
            style={{
              width: dimensions.width,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                paddingLeft: 15,
              }}
            >
              {categories.map((item) => {
                return (
                  <CustomButton
                    key={item}
                    onPress={() => {
                      setFilterChosen(item);
                    }}
                    marginVertical={0}
                    marginHorizontal={3}
                    buttonColor={
                      item == filterChosen ? colors.wpurple : colors.white
                    }
                    height={40}
                    fontSize={14}
                    borderRadius={60}
                    textColor={
                      item == filterChosen ? colors.white : colors.wpurple
                    }
                    borderColor={colors.wpurple}
                    fontFamily="inter"
                    fontWeight="medium"
                    lSpacing={undefined}
                  >
                    {item}
                  </CustomButton>
                );
              })}
              <TextInput
                mode="outlined"
                placeholder={"Search Item..."}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => {
                  setSearchText(text);
                }}
                outlineColor={colors.wpurple}
                textColor="black"
                theme={{ roundness: 50 }}
                style={{
                  backgroundColor: colors.verylightgray,
                  width: "51%",
                  marginHorizontal: "2%",
                  alignSelf: "center",
                }}
                contentStyle={{
                  textAlign: "left",
                  paddingBottom: 15,
                }}
                outlineStyle={{ height: 40 }}
              ></TextInput>
            </View>
          </View>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginLeft: "1.3%",
                flexWrap: "wrap",
              }}
            >
              {finalFoods.map((item, index) => {
                return (
                  <FoodBox
                    key={index}
                    onPress={() => {
                      router.push("/(tabs)/food_description");
                    }}
                    name={item.name}
                    rating={item.rating}
                    fontSize={12}
                    width={dimensions.width * 0.29}
                    minWidth={113.1}
                  />
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
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
