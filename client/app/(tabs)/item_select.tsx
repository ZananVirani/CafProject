import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
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

export default function ItemSelect() {
  const dimensions = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [finalFoods, setFinalFoods] = useState([{ name: "", rating: 0 }]);
  const [selectedPresets, setSelectedPresets] = useState(new Set());

  const allItems = [
    { name: "Pina Colada", rating: 3.8 },
    { name: "Grilled Cheese", rating: 3.8 },
    { name: "Other Item", rating: 3.8 },
    { name: "Hot Dog", rating: 3.8 },
    { name: "Pina Colada", rating: 3.8 },
    { name: "Grilled Cheese", rating: 3.8 },
    { name: "Other Item", rating: 3.8 },
    { name: "Hot Dog", rating: 3.8 },
    { name: "Pina Colada", rating: 3.8 },
    { name: "Grilled Cheese", rating: 3.8 },
    { name: "Other Item", rating: 3.8 },
    { name: "Hot Dog", rating: 3.8 },
    { name: "Pina Colada", rating: 3.8 },
    { name: "Grilled Cheese", rating: 3.8 },
    { name: "Other Item", rating: 3.8 },
    { name: "Hot Dog", rating: 3.8 },
  ];

  useEffect(() => {
    let tempFoods = allItems;

    setFinalFoods(
      tempFoods.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText]);

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
              <Text style={styles.title}>Item Select</Text>
            </View>
          </View>
          <View
            style={{
              width: dimensions.width,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                width: "90%",
                alignItems: "flex-start",
              }}
            >
              <CustomButton
                onPress={() => {
                  setSelectMode(!selectMode);
                }}
                marginVertical={0}
                marginHorizontal={3}
                buttonColor={selectMode ? colors.wpurple : colors.white}
                height={40}
                fontSize={14}
                borderRadius={60}
                textColor={selectMode ? colors.white : colors.wpurple}
                borderColor={colors.wpurple}
                fontFamily="inter"
                fontWeight="medium"
                lSpacing={undefined}
              >
                {selectMode ? "Unselect" : "Select"}
              </CustomButton>
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
                  position: "absolute",
                  right: 0,
                  width: "63%",
                  backgroundColor: colors.verylightgray,
                }}
                contentStyle={{
                  textAlign: "left",
                  paddingBottom: 15,
                  paddingRight: 40,
                }}
                outlineStyle={{ height: 40 }}
              ></TextInput>
              <AntDesign
                name="search1"
                color={colors.gray}
                size={20}
                style={{
                  position: "absolute",
                  right: 15,
                  top: 9,
                }}
              />
            </View>
          </View>
          <ScrollView>
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
                        selectMode
                          ? toggleSelect(item.name)
                          : visitPreset(item.name);
                      }}
                      selected={selectMode && selectedPresets.has(item.name)}
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
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: dimensions.width,
              marginBottom: 40,
            }}
          >
            <CustomButton
              onPress={() =>
                Alert.alert(
                  `Are You Sure You Want Add Selected Items?`,
                  undefined,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        router.back();
                      },
                    },
                  ]
                )
              }
              borderRadius={20}
              buttonColor={colors.wpurple}
            >
              Add Selected Items
            </CustomButton>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );

  function toggleSelect(item: string) {
    let tempPresets = new Set(selectedPresets);
    tempPresets.has(item) ? tempPresets.delete(item) : tempPresets.add(item);
    console.log(tempPresets);

    setSelectedPresets(tempPresets);
  }

  function visitPreset(item: string) {
    router.push("/(tabs)/food_description");
  }
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
