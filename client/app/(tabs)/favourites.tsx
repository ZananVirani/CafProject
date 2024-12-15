/**
 * Screen to display the user's favourite foods.
 */
import Constants from "expo-constants";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { ActivityIndicator, TextInput } from "react-native-paper";
import FoodBox from "@/components/FoodBox";
import axios from "axios";
import { getUserID } from "@/utils/AsyncStorage";

export default function Favourites() {
  // Dimensions of the window
  const dimensions = useWindowDimensions();
  // Text field in the search bar
  const [searchText, setSearchText] = useState("");
  // Filter chosen by the user, either display all items or only favourites
  const [filterChosen, setFilterChosen] = useState("Favs");
  const categories: string[] = ["Favs", "All"];

  // All food items in the database
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
  // Food items to actually be displayed
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
  // Activity indicator to show loading
  const [loaded, setLoaded] = useState(false);
  // User data
  const [user, setUser] = useState<
    | {
        studentId: string;
        firstName: string;
        lastName: string;
        password?: string;
        role: string;
        allergies: string[];
        favouriteCafeterias: string[];
        favouriteFoods: string[];
      }
    | undefined
  >(undefined);

  // Get all food items from the database
  const getItems = async () => {
    setLoaded(false);
    const userID = await getUserID();
    axios
      .get(`http://${Constants.expoConfig!.extra!.apiUrl}/foods/allFoods`, {
        params: {
          studentId: userID,
        },
      })
      .then((result) => {
        setAllItems(result.data.foods);
        setFinalFoods(result.data.foods);
        setUser(result.data.user);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get all food items from the database when the screen is focused
  useFocusEffect(
    useCallback(() => {
      getItems();
    }, [])
  );

  // Filter the food items based on the search text and filter chosen
  useEffect(() => {
    let tempFoods = allItems;

    setFinalFoods(
      tempFoods.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, filterChosen]);

  return (
    // TouchableWithoutFeedback is used to dismiss the keyboard when the user taps outside the text field
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
          {loaded ? (
            <>
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
                    width: dimensions.width,
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
              <ScrollView>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginLeft: "1.3%",
                    flexWrap: "wrap",
                  }}
                >
                  {finalFoods.map((item, index) => {
                    return filterChosen == "All" ||
                      (user && user?.favouriteFoods.includes(item._id)) ? (
                      <FoodBox
                        key={index}
                        onPress={() => {
                          router.push({
                            pathname: "/(tabs)/food_description",
                            params: {
                              itemName: item.name,
                            },
                          });
                        }}
                        source={`http://${
                          Constants.expoConfig!.extra!.apiUrl
                        }/images/${item.image}`}
                        name={item.name}
                        rating={item.averageRating}
                        fontSize={12}
                        width={dimensions.width * 0.29}
                        minWidth={113.1}
                      />
                    ) : null;
                  })}
                </View>
              </ScrollView>
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
