/**
 * Screen when a food item is clicked, displaying all of the food item's information.
 */

import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome6,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { Collapsible } from "@/components/Collapsible";
import { Dialog } from "react-native-simple-dialogs";
import StarRating from "react-native-star-rating-widget";
import CustomButton from "@/components/CustomButton";
import axios, { all } from "axios";
import { router, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { getUserID } from "@/utils/AsyncStorage";
import Constants from "expo-constants";

export default function FoodDescription() {
  // Food information
  const [apiInfo, setApiInfo] = useState<{
    _id: string;
    name: string;
    image: string;
    allergies: string[];
    type: string;
    averageRating: number;
    cafeterias: string[];
  }>();
  // Cafeteria and food item name
  const { cafName, itemName } = useGlobalSearchParams();
  // User ID
  const [ID, setID] = useState("");
  // Activity Indicator to show loading
  const [loaded, setLoaded] = useState(false);

  // Get the food item and user allergies from the database.
  const getItem = async () => {
    const userID = await getUserID();
    setID(userID!);
    await axios
      .get(
        `http://${
          Constants.expoConfig!.extra!.apiUrl
        }/foods/food/${itemName}/${userID}`
      )
      .then((value) => {
        setApiInfo(value.data.foods);
        setLoaded(true);
        value.data.foods.allergies.forEach((item: string) => {
          value.data.user.allergies.includes(item) && setIsAllergic(true);
        });
        value.data.user.favouriteFoods.includes(value.data.foods._id) &&
          setChecked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get the food item and user allergies from the database.
  useEffect(() => {
    getItem();
  }, []);

  // Triggers if the user is allergic to an ingredient in the food item.
  const [isAllergic, setIsAllergic] = useState(false);
  // Dimensions of the window
  const dimensions = useWindowDimensions();
  // State variable for the if the food item is liked or not by the user.
  const [checked, setChecked] = useState(false);
  // Pop up the dialog for the user to leave a review.
  const [dialog, setDialog] = useState(false);
  // State variable for the rating the user gives the food item.
  const [rating, setRating] = useState(0);
  // State variable for the pop up at the bottom of the screen when the food item is added to favourites.
  const [bottomPop, setBottomPop] = useState(false);

  return (
    <View
      style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
    >
      {/* Dialog for the user to leave a review */}
      <Dialog
        visible={dialog}
        title="Leave A Review!"
        titleStyle={styles.dialog}
        onTouchOutside={() => {
          setDialog(false);
        }}
        onRequestClose={() => {}}
        contentInsetAdjustmentBehavior={undefined}
        animationType="fade"
        dialogStyle={{ borderRadius: 10 }}
      >
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setRating(0)}
              style={{ flex: 0.5 }}
            >
              <Text style={[styles.dialog, { fontSize: 16 }]}>0</Text>
            </TouchableWithoutFeedback>
            <StarRating
              starSize={40}
              color={colors.yellow}
              rating={rating}
              onChange={(value) => {
                setRating(value);
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => setRating(5)}
              style={{ flex: 0.5 }}
            >
              <Text style={[styles.dialog, { fontSize: 16 }]}>5</Text>
            </TouchableWithoutFeedback>
          </View>
          <CustomButton
            // Submit the review to the database, either making it a new review or updating the old one.
            onPress={async () => {
              const userID = await getUserID();
              await axios
                .post(
                  `http://${
                    Constants.expoConfig!.extra!.apiUrl
                  }/reviews/${userID}/${apiInfo?._id}`,
                  { rating: rating }
                )
                .then((response) => {
                  setApiInfo({
                    ...apiInfo!,
                    averageRating: response.data.newAvg,
                  });
                  if (response.status == 201) {
                    Alert.alert("Successfully Changed Review", undefined, [
                      {
                        text: "OK",
                        onPress: () => {},
                      },
                    ]);
                  } else {
                    Alert.alert("Successfully Added Review", undefined, [
                      {
                        text: "OK",
                        onPress: () => {},
                      },
                    ]);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  Alert.alert("Unsuccessful Review Attempt", undefined, [
                    {
                      text: "OK",
                      onPress: () => {},
                    },
                  ]);
                })
                .finally(() => {
                  setDialog(false);
                });
            }}
            borderRadius={15}
            marginHorizontal="6%"
            fontSize={16}
            height={50}
          >
            Submit
          </CustomButton>
        </View>
      </Dialog>
      <SafeAreaView style={{ flex: 1, zIndex: 0 }}>
        <View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "5%",
          }}
        >
          <View
            style={{ flex: 0.97, flexDirection: "row", alignItems: "center" }}
          >
            <AntDesign
              color={colors.black}
              name="leftcircleo"
              size={30}
              onPress={() => router.back()}
            />
            <Text style={styles.title}>{cafName}</Text>
          </View>
          <View style={{ flex: 0.03 }}></View>
        </View>

        {loaded ? (
          <ScrollView>
            <Image
              source={{
                uri: `http://${Constants.expoConfig!.extra!.apiUrl}/images/${
                  apiInfo?.image
                }`,
              }}
              style={{
                alignSelf: "center",
                borderRadius: 20,
                width: dimensions.width * 0.9,
                height: dimensions.width * 0.9,
              }}
            ></Image>

            <View
              style={{
                marginTop: 20,
                marginHorizontal: "5%",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: "2%",
                }}
              >
                <View
                  style={{
                    flex: 0.79,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {apiInfo?.name}
                  </Text>
                </View>

                <MaterialCommunityIcons
                  // Like icon
                  color={checked ? colors.wpurple : colors.gray}
                  name={"heart-circle"}
                  size={50}
                  onPress={async () => {
                    await axios
                      .patch(
                        `http://${
                          Constants.expoConfig!.extra!.apiUrl
                        }/users/changeFavouriteFoods/${ID}/${apiInfo?._id}`
                      )
                      .then((result) => {
                        if (!checked) {
                          setBottomPop(true);
                          setTimeout(() => setBottomPop(false), 2000);
                        }
                        setChecked(!checked);
                      })
                      .catch((e) => console.log(e));
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    alignSelf: "center",
                    flex: 0.21,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: "2%",
                  marginVertical: 10,
                }}
              >
                <Ionicons
                  color={colors.yellow}
                  name="star"
                  size={20}
                  onPress={() => {}}
                />
                <Text style={styles.rating}>
                  {!apiInfo ||
                  apiInfo?.averageRating < 0 ||
                  apiInfo?.averageRating > 5
                    ? "NA"
                    : apiInfo?.averageRating.toFixed(1)}
                </Text>
                <TouchableOpacity onPress={() => setDialog(true)}>
                  <Text
                    style={[
                      styles.rating,
                      {
                        fontStyle: "italic",
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    Leave A Review
                  </Text>
                </TouchableOpacity>
              </View>
              {isAllergic && (
                <View style={{ marginHorizontal: "2%", marginVertical: 8 }}>
                  <Text style={styles.error}>
                    WARNING : Restrictions Within Food Item
                  </Text>
                </View>
              )}
              <Collapsible title="Available Cafeterias">
                <View style={{ marginVertical: 3, width: "100%" }}>
                  <Text style={[styles.allergy, { textAlign: "left" }]}>
                    Served at the following cafeterias:
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 20,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {apiInfo?.cafeterias.map((item) => {
                    return (
                      <View
                        key={item}
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          width: dimensions.width * 0.25,
                          height: dimensions.width * 0.25,
                          marginRight: 12,
                          shadowColor: colors.gray,
                          shadowOffset: { height: 1, width: 0.6 },
                          shadowOpacity: 0.8,
                          shadowRadius: 0.2,
                          backgroundColor: colors.verylightgray,
                          marginTop: 12,
                          borderRadius: 7,
                        }}
                      >
                        <FontAwesome6
                          color={colors.wpurple}
                          name={"house"}
                          size={25}
                          style={{ alignSelf: "center" }}
                        />
                        <Text
                          style={[
                            styles.allergy,
                            {
                              fontWeight: "semibold",
                              marginTop: 10,
                              lineHeight: 17,
                            },
                          ]}
                          adjustsFontSizeToFit={true}
                        >
                          {item.split(" ")[0]}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Collapsible>
              <View style={{ width: "100%", height: 10 }}></View>
              <Collapsible title="Food Restrictions     ">
                <View style={{ marginVertical: 3, width: "100%" }}>
                  <Text style={[styles.allergy, { textAlign: "left" }]}>
                    This dish contains the following:
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 40,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {apiInfo?.allergies.map((item) => {
                    return (
                      <View
                        key={item}
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          width: dimensions.width * 0.25,
                          height: dimensions.width * 0.25,
                          marginRight: 12,
                          shadowColor: colors.gray,
                          shadowOffset: { height: 1, width: 0.6 },
                          shadowOpacity: 0.8,
                          shadowRadius: 0.2,
                          backgroundColor: colors.verylightgray,
                          marginTop: 12,
                          borderRadius: 7,
                        }}
                      >
                        {/* Icon for the food allergies */}
                        <MaterialCommunityIcons
                          color={colors.wpurple}
                          name={
                            item == "Meat"
                              ? "food-drumstick"
                              : item == "Gluten"
                              ? "barley"
                              : item == "Pork"
                              ? "pig-variant"
                              : item == "Dairy"
                              ? "cheese"
                              : item == "Seafood"
                              ? "fish"
                              : "peanut"
                          }
                          size={40}
                          style={{ alignSelf: "center" }}
                        />
                        <Text
                          style={[styles.allergy, { fontWeight: "semibold" }]}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Collapsible>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              animating={!loaded}
              color={colors.wpurple}
            ></ActivityIndicator>
          </View>
        )}
        {bottomPop && (
          <View
            style={{
              width: dimensions.width,
              alignItems: "center",
              position: "absolute",
              bottom: 40,
            }}
          >
            <View
              style={{
                backgroundColor: colors.darkgray,
                justifyContent: "center",
                alignItems: "center",
                width: dimensions.width * 0.7,
                height: 50,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontFamily: "inter",
                  fontSize: 18,
                }}
              >
                Added To Favourites
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 30,
    fontWeight: "500",
    marginLeft: 15,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  dialog: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 5,
  },
  allergy: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: "inter",
    textAlign: "center",
  },
  itemTitle: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "medium",
    fontSize: 31,
    letterSpacing: -0.3,
  },
  rating: {
    color: colors.gray,
    fontSize: 18,
    marginLeft: 6,
  },
});
