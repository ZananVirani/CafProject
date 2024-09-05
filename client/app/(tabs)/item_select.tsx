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
import { ActivityIndicator, TextInput } from "react-native-paper";
import FoodBox from "@/components/FoodBox";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "@/state/presets/presetSlice";

export default function ItemSelect() {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<
    {
      _id: string;
      name: string;
      image: string;
      allergies: string[];
      type: string;
      averageRating: Number;
      cafeterias: string[];
    }[]
  >([]);
  const [selectMode, setSelectMode] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [finalFoods, setFinalFoods] = useState<
    {
      _id: string;
      name: string;
      image: string;
      allergies: string[];
      type: string;
      averageRating: Number;
      cafeterias: string[];
    }[]
  >([]);
  const [selectedPresets, setSelectedPresets] = useState<
    {
      _id: string;
      name: string;
      image: string;
      allergies: string[];
      type: string;
      averageRating: Number;
      cafeterias: string[];
    }[]
  >([]);

  const getItems = async () => {
    axios
      .get("http://10.0.0.135:3000/foods/allFoods")
      .then((result) => {
        setAllItems(result.data);
        setFinalFoods(result.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (allItems) {
      let tempFoods = allItems;

      setFinalFoods(
        tempFoods.filter((item) => {
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    }
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
          {loaded ? (
            <>
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
                              ? toggleSelect(item)
                              : visitPreset(item.name);
                          }}
                          source={`http://10.0.0.135:3000/images/${item.image}`}
                          selected={
                            selectMode &&
                            selectedPresets.find((food, index) => {
                              return item.name == food.name;
                            })
                          }
                          name={item.name}
                          rating={item.averageRating}
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
                            selectedPresets.forEach((item) => {
                              dispatch(add(item));
                            });
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
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                animating={!loaded}
                color={colors.wpurple}
              ></ActivityIndicator>
            </View>
          )}
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );

  function toggleSelect(item: {
    _id: string;
    name: string;
    image: string;
    allergies: string[];
    type: string;
    averageRating: Number;
    cafeterias: string[];
  }) {
    let newFoods = selectedPresets.filter((food, index) => {
      return food.name !== item.name;
    });

    newFoods.length == selectedPresets.length
      ? setSelectedPresets([...selectedPresets, item])
      : setSelectedPresets(newFoods);
  }

  function visitPreset(item: string) {
    router.push("/(tabs)/food_description");
    router.setParams({ itemName: item });
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
