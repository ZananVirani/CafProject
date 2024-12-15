/**
 * Cafeteria Screen, where the user can view the menu of a cafeteria.
 */

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "../../constants/Colors";
import FoodBox from "@/components/FoodBox";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Toggle from "@imcarlosguerrero/react-native-switch-toggle";
import { router, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { Dialog } from "react-native-simple-dialogs";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { getUserID } from "@/utils/AsyncStorage";

export default function Cafeteria() {
  // Name of the cafeteria for the header.
  const { cafName } = useGlobalSearchParams();
  // Dimensions of the window.
  const dimensions = useWindowDimensions();
  // Array of Foods being served in the cafeteria.
  const [foods, setFoods] = useState<
    {
      _id: string;
      name: string;
      image: string;
      allergies: string[];
      type: string;
      averageRating: Number;
      cafeterias: string[];
    }[]
  >();
  // User information.
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
  // Categories of food being served.
  const categories = ["Favourites", "Hot Food", "Interactive"];
  // Toggle for hiding restrictions.
  const [toggle, setToggle] = useState(false);
  // Dialog for when the cafeteria is closed.
  const [dialog, setDialog] = useState(false);
  // Bottom pop up for when the cafeteria is closed.
  const [bottomPop, setBottomPop] = useState(false);
  // Activity Indicator for when the page is loading.
  const [loaded, setLoaded] = useState(false);

  // Load the foods being served in the cafeteria from the server.
  const getFoods = async () => {
    setLoaded(false);
    const userID = await getUserID();
    await axios
      .get(`http://10.0.0.135:3000/cafeterias/getFood/${cafName}/${userID}`)
      .then((result) => {
        setFoods(result.data.foods);
        setUser(result.data.user);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);
        console.log(error);
        Alert.alert(
          "Something Went Wrong",
          "Check Your Connection And Try Again",
          [
            {
              text: "OK",
              onPress: () => {},
            },
          ]
        );
      });
  };

  // Load the foods being served everytime the screen is focused.
  useFocusEffect(
    useCallback(() => {
      getFoods();
    }, [])
  );

  // Check if the cafeteria is open, display dialog and bottom pop up if not.
  useEffect(() => {
    const result = !getCafOpen();
    setDialog(result);
    setBottomPop(result);
  }, []);

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: colors.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Dialog for when the cafeteria is closed. */}
        <Dialog
          visible={dialog}
          title="Sorry! This Caf Is Closed"
          titleStyle={styles.dialog}
          onRequestClose={() => {}}
          onTouchOutside={() => setDialog(false)}
          contentInsetAdjustmentBehavior={undefined}
          animationType="fade"
          dialogStyle={{
            borderRadius: 20,
            width: dimensions.width * 0.7,
            alignSelf: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <FontAwesome6
              name="face-sad-tear"
              size={70}
              color={colors.wpurple}
            />
          </View>
          <CustomButton
            onPress={() => {
              setDialog(false);
              setTimeout(() => {
                router.back();
              }, 500);
            }}
            borderRadius={15}
            marginHorizontal={0}
            fontSize={16}
            height={50}
            buttonColor={colors.wpurple}
            marginTop={25}
          >
            Back To Home Screen
          </CustomButton>
        </Dialog>
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
          <FontAwesome5
            color={colors.black}
            name="user-circle"
            size={33}
            onPress={() => router.push("/(tabs)/profile")}
          />
          <View style={{ flex: 0.03 }}></View>
        </View>
        {
          // If the page is loaded, display the menu.
          loaded ? (
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
                  {/* Display the regular hours of each cafeteria. */}
                  <Text style={styles.text}>Regular Hours:</Text>
                  <Text style={styles.subtext}>
                    Weekdays: 7:30am -{" "}
                    {["Ontario Hall", "Saugeen Hall", "Sydenham Hall"].includes(
                      cafName.toString()
                    )
                      ? "11:00"
                      : cafName.toString() == "Delaware Hall"
                      ? "11:00"
                      : "7:30"}
                    pm
                  </Text>
                  <Text style={styles.subtext}>
                    Weekends: 7:30am -
                    {["Ontario Hall", "Saugeen Hall", "Sydenham Hall"].includes(
                      cafName.toString()
                    )
                      ? "11:00"
                      : "7:30"}
                    pm
                  </Text>
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
                    Hide Restrictions:
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
              {
                // If the user is an admin, display the button that allows them to change the menu.
                user?.role == "admin" && (
                  <View style={{ width: dimensions.width }}>
                    <CustomButton
                      onPress={() => {
                        router.push({
                          pathname: "/(tabs)/menu",
                          params: { cafName: cafName },
                        });
                      }}
                      marginTop={20}
                      borderRadius={20}
                      buttonColor={colors.wpurple}
                    >
                      Change Menu
                    </CustomButton>
                  </View>
                )
              }
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
                            ? "fire"
                            : category == "Interactive"
                            ? "food-turkey"
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
                      {
                        // When the foods are loaded, display the food boxes under their respective categories.
                        foods &&
                          foods.map((item, index) => {
                            return category == "Favourites" ? (
                              user?.favouriteFoods.includes(item._id) &&
                              (!toggle || !hasSimilar(item.allergies)) ? (
                                <FoodBox
                                  onPress={() => {
                                    router.push({
                                      pathname: "/(tabs)/food_description",
                                      params: {
                                        cafName,
                                        itemName: item.name,
                                      },
                                    });
                                  }}
                                  key={index}
                                  source={`http://10.0.0.135:3000/images/${item.image}`}
                                  name={item.name}
                                  rating={item.averageRating}
                                  fontSize={12}
                                  width={dimensions.width * 0.29}
                                  minWidth={113.1}
                                />
                              ) : null
                            ) : category == item.type &&
                              (!toggle || !hasSimilar(item.allergies)) ? (
                              <FoodBox
                                onPress={() => {
                                  router.push({
                                    pathname: "/(tabs)/food_description",
                                    params: {
                                      cafName,
                                      itemName: item.name,
                                    },
                                  });
                                }}
                                key={index}
                                source={`http://10.0.0.135:3000/images/${item.image}`}
                                name={item.name}
                                rating={item.averageRating}
                                fontSize={12}
                                width={dimensions.width * 0.29}
                                minWidth={113.1}
                              />
                            ) : null;
                          })
                      }
                    </View>
                  </View>
                );
              })}
              <View style={{ width: dimensions.width, height: 80 }}></View>
            </ScrollView>
          ) : (
            // Show actvivity indicator when the page is loading.
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
          )
        }
        {
          // Display the bottom pop up for when the cafeteria is closed.
          bottomPop && (
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
                  Caf Is Closed :{"("}
                </Text>
              </View>
            </View>
          )
        }
      </SafeAreaView>
    </View>
  );

  // Function to determine if the cafeteria is open according to the current time.
  function getCafOpen() {
    const date = new Date();
    return (
      CafHours.getBreakfast(date) ||
      CafHours.getLunch(date) ||
      CafHours.getLateLunch(date) ||
      CafHours.getDinner(date) ||
      CafHours.getSnackBar(date)
    );
  }

  // Function to determine if the user has allergies in the food being served.
  function hasSimilar(list: string[]) {
    for (let allergy of list) {
      if (user?.allergies.includes(allergy)) {
        return true;
      }
      return false;
    }
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 30,
    fontWeight: "500",
    marginLeft: 15,
  },
  text: {
    color: colors.wpurple,
    fontSize: 20,
    fontWeight: "medium",
    lineHeight: 35,
  },
  dialog: {
    fontFamily: "inter",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
  subdialog: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: colors.darkgray,
    fontFamily: "inter",
    fontStyle: "italic",
  },
  subtext: {
    color: colors.wpurple,
    fontSize: 13.5,
    fontWeight: "medium",
    lineHeight: 17,
    letterSpacing: -0.5,
  },
});

/**
 *
 */
class CafHours {
  // Method to determine if it is breakfast time.
  static getBreakfast(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours == 8 || hours == 9 || hours == 10) return true;
    if (hours == 7) {
      return minutes >= 30;
    } else if (hours == 11) {
      return minutes <= 15;
    }

    return false;
  }

  // Method to determine if it is lunch time.
  static getLunch(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours == 12 || hours == 13) return true;
    if (hours == 11) {
      return minutes >= 30;
    } else if (hours == 14) {
      return minutes == 0;
    }

    return false;
  }

  // Method to determine if it is late lunch time.
  static getLateLunch(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours == 15) return true;
    if (hours == 14) {
      return minutes >= 30;
    } else if (hours == 16) {
      return minutes <= 15;
    }

    return false;
  }

  // Method to determine if it is dinner time.
  static getDinner(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours == 17 || hours == 18) return true;
    if (hours == 16) {
      return minutes >= 30;
    } else if (hours == 19) {
      return minutes <= 30;
    }

    return false;
  }

  // Method to determine if it is snack bar time.
  static getSnackBar(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours == 20 || hours == 21 || hours == 22) return true;
    if (hours == 23) {
      return minutes == 0;
    }

    return false;
  }
}
