/**
 * The main screen of the application.
 */
import Constants from "expo-constants";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import colors from "../../constants/Colors";
import { router, useFocusEffect } from "expo-router";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import FoodBox from "@/components/FoodBox";
import { useWindowDimensions } from "react-native";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import {
  getFilters,
  getSelectedCaf,
  getUserID,
  setFilters,
  setSelectedCaf,
} from "@/utils/AsyncStorage";
import MainCafBox from "@/components/MainCafBox";
import { ActivityIndicator } from "react-native-paper";
import * as Location from "expo-location";
import { orderByDistance } from "geolib";
import {
  GeolibInputCoordinates,
  GeolibLatitudeInputValue,
  GeolibLongitudeInputValue,
} from "geolib/es/types";

export default function MainScreen() {
  // Dimensions of the screen
  const dimensions = useWindowDimensions();
  // Foods to be displayed
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
  >([]);
  // User information
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
  // Show loading bar when the page is loading.
  const [loaded, setLoaded] = useState(false);
  // Show loading bar when the cafeteria section of the page is loading.
  const [partialLoaded, setPartialLoaded] = useState(false);
  // Categories to order the cafeteria boxes by.
  const [categories, setCategories] = useState([""]);
  // The index of the cafeteria that is currently selected under the 'favourite cafeterias' section.
  const [cafNum, setCafNum] = useState(0);
  // The category that is currently selected
  const [filterChosen, setFilterChosen] = useState<string | undefined>(
    undefined
  );
  const [buttonColor, setButtonColor] = useState<string>("#B09DC7");
  // The list of cafeterias to be displayed, all constant information is hardcoded.
  const origBoxes = [
    {
      cafName: "Ontario Hall",
      latitude: 43.000857807496786,
      longitude: -81.2791898025856,
      source: require("../../assets/images/ontario_caf.jpg"),
    },
    {
      cafName: "Sydenham Hall",
      latitude: 43.00770220562324,
      longitude: -81.26518228837382,
      source: require("../../assets/images/sydenham_caf.png"),
    },
    {
      cafName: "Perth Hall",
      latitude: 42.99992857596394,
      longitude: -81.27690098791986,
      source: require("../../assets/images/perth_caf.jpg"),
    },

    {
      cafName: "Delaware Hall",
      latitude: 43.00869331329643,
      longitude: -81.26906517337886,
      source: require("../../assets/images/delaware_caf.png"),
    },
    {
      cafName: "Elgin Hall",
      latitude: 43.00826951356022,
      longitude: -81.26499353540011,
      source: require("../../assets/images/elgin_caf.png"),
    },
    {
      cafName: "Essex Hall",
      latitude: 43.00112215346329,
      longitude: -81.27587825892331,
      source: require("../../assets/images/essex_caf.png"),
    },
    {
      cafName: "Saugeen Hall",
      latitude: 43.01138296240347,
      longitude: -81.27889573091967,
      source: require("../../assets/images/saugeen_caf.jpg"),
    },
  ];
  // The list of cafeterias to be displayed, this list is mutable.
  const [cafBoxes, setCafBoxes] =
    useState<
      { cafName: string; latitude: number; longitude: number; source: any }[]
    >(origBoxes);

  // Function to order the list of cafeterias to be displayed based on the filter chosen.
  const determineList = async (tempFilter: string, favFoods: string[]) => {
    let temp: any;

    // Order by alphabetical order.
    if (tempFilter == "A-Z") {
      temp = origBoxes.sort((a, b) => a.cafName.localeCompare(b.cafName));
    }
    // Order by location of the user, using Expo Location API.
    else if (tempFilter == "Nearby") {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status == "granted") {
        const loc = await Location.getCurrentPositionAsync();

        let newList: {
          latitude: GeolibLatitudeInputValue;
          longitude: GeolibLongitudeInputValue;
        }[] = [];
        origBoxes.forEach((item) => {
          newList.push({ latitude: item.latitude, longitude: item.longitude });
        });
        const tempList: GeolibInputCoordinates[] = orderByDistance(
          { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
          newList
        );

        newList = [];
        for (let i = 0; i < origBoxes.length; i++) {
          for (let caf of origBoxes) {
            if (
              JSON.stringify({
                latitude: caf.latitude,
                longitude: caf.longitude,
              }) == JSON.stringify(tempList[i])
            ) {
              newList.push(caf);
              break;
            }
          }
        }

        temp = newList;
      }
    }
    // Order by the user's favourite foods, only showing cafeterias that are serving
    // at least one of the user's favourite foods.
    else {
      const response = await axios.get(
        `http://${Constants.expoConfig!.extra!.apiUrl}/users/getFavFoods`,
        {
          params: {
            foodIDs: favFoods,
          },
        }
      );

      const newList: {
        cafName: string;
        latitude: number;
        longitude: number;
        source: any;
      }[] = [];

      origBoxes?.forEach((item) => {
        if (response.data.includes(item.cafName)) {
          newList.push(item);
        }
      });

      temp = newList;
    }

    // Set the list of cafeterias to be displayed.
    setCafBoxes(temp);
  };

  // Use the useRef hook to keep track of the number of times the a filter has been chosen,
  // to prevent the filterChosen useEffect hook from running on the first render.
  let tempNum = useRef(0);
  useEffect(() => {
    if (filterChosen) {
      if (tempNum.current > 0) {
        setPartialLoaded(false);
        determineList(filterChosen, user?.favouriteFoods!).then(() => {
          setPartialLoaded(true);
        });
      } else {
        tempNum.current = tempNum.current + 1;
      }
    }
  }, [filterChosen]);

  // Function to get the foods and user information from the server.
  const getFoods = async () => {
    try {
      const userID = await getUserID();
      const result = await axios.get(
        `http://${
          Constants.expoConfig!.extra!.apiUrl
        }/cafeterias/favouriteCafs`,
        {
          params: {
            userID,
          },
        }
      );

      setFoods(result.data.foods);
      setUser(result.data.user);
      // Get the previously selected caf from AsyncStorage and set the cafNum to the index of the selected caf.
      getSelectedCaf()
        .then((value) => {
          let num = result.data.user.favouriteCafeterias.indexOf(value);
          num > -1 ? setCafNum(num) : setCafNum(0);
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  // Get the foods and user information from the server everytime the screen loads in.
  useFocusEffect(
    useCallback(() => {
      setLoaded(false);
      getFoods().then((result) => {
        getFilters()
          .then((value) => {
            setCategories(value);
            setFilterChosen(value[0]);
            setPartialLoaded(false);
            determineList(value[0], result?.data.user.favouriteFoods).then(
              () => {
                setPartialLoaded(true);
              }
            );
          })
          .catch((error) => console.log(error));
        setLoaded(true);
      });
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {loaded ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              height: 80,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "5%",
            }}
          >
            <View
              style={{
                flex: 0.97,
                flexDirection: "column",
                paddingRight: 5,
              }}
            >
              {/* Greet the user, capitalize the first letter of the name. */}
              <Text style={styles.title} numberOfLines={1}>
                Hi,
                {user?.firstName.replace(
                  user?.firstName.charAt(0),
                  user?.firstName.charAt(0).toUpperCase()
                )}
              </Text>
              <Text style={styles.subtitle}>Check Out What's Cooking</Text>
            </View>
            {/* Profile icon to navigate to the profile screen. */}
            <FontAwesome5
              color={colors.black}
              name="user-circle"
              size={40}
              onPress={() => {
                router.push("/(tabs)/profile");
              }}
            />
            <View style={{ flex: 0.03 }}></View>
          </View>
          <View
            style={{
              width: dimensions.width,
              flexDirection: "row",
              marginLeft: "5%",
              marginTop: "6%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: dimensions.width * 0.64,
                flexDirection: "row",
              }}
            >
              {/* Shuffle through the user's favourite cafeterias. */}
              <Ionicons
                name="shuffle"
                size={33}
                color={colors.gray}
                onPress={async () => {
                  let newNum = (cafNum + 1) % user!.favouriteCafeterias.length;
                  setCafNum(newNum);
                  await setSelectedCaf(user!.favouriteCafeterias[newNum]);
                }}
              />
              <Text style={styles.cafTitle}>
                {user ? user.favouriteCafeterias[cafNum] : ""}
              </Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                router.push({
                  pathname: "/(tabs)/cafeteria",
                  params: {
                    cafName: user?.favouriteCafeterias[cafNum],
                    role: user?.role,
                    allergies: user?.allergies,
                    favouriteFoods: user?.favouriteFoods,
                  },
                });
              }}
              style={{ flex: 1 }}
            >
              <Text style={[styles.subtitle, { fontSize: 15 }]}>
                See Cafeteria
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            style={{
              maxHeight: dimensions.width * 0.4,
              width: dimensions.width,
              marginTop: 15,
              flexDirection: "row",
              marginLeft: "3%",
            }}
          >
            {
              // Display the foods that are served at the selected cafeteria.
              user &&
                foods.map((item, index) => {
                  return item.cafeterias.includes(
                    user.favouriteCafeterias[cafNum]
                  ) ? (
                    <FoodBox
                      onPress={() => {
                        router.push({
                          pathname: "/(tabs)/food_description",
                          params: {
                            cafName: user?.favouriteCafeterias[cafNum],
                            itemName: item.name,
                            allergies: user?.allergies,
                          },
                        });
                      }}
                      key={index}
                      source={`http://${
                        Constants.expoConfig!.extra!.apiUrl
                      }/images/${item.image}`}
                      name={item.name}
                      rating={item.averageRating}
                      fontSize={10.5}
                      ratingFont={9}
                      starSize={10}
                      width={dimensions.width * 0.26}
                      minWidth={100}
                      marginLeft="1%"
                      height={dimensions.width * 0.105}
                      marginTop="0%"
                    />
                  ) : null;
                })
            }
            <View style={{ flex: 1, width: 120 }}></View>
          </ScrollView>
          <View
            style={{
              width: dimensions.width,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "5%",
              marginTop: "4%",
            }}
          >
            <Text style={styles.cafTitle}>All Residences</Text>
            {/* Shuffle through the categories. */}
            <TouchableOpacity
              style={{ marginLeft: dimensions.width * 0.13 }}
              onPress={async () => {
                let newFilters = Array.from(categories);
                categories.forEach((item, index) => {
                  let newIndex = (index + 1) % categories.length;
                  newFilters[newIndex] = item;
                });
                setCategories(newFilters);
                await setFilters(newFilters);
              }}
            >
              <Text style={[styles.subtitle, { fontSize: 16 }]}>
                Shuffle Titles
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              marginHorizontal: "5%",
            }}
          >
            {/* Display the categories to order the cafeterias by. */}
            {categories.map((item) => {
              return (
                <CustomButton
                  key={item}
                  onPress={() => {
                    setFilterChosen(item);
                  }}
                  marginVertical={5}
                  marginHorizontal={10}
                  buttonColor={
                    item == filterChosen ? colors.wpurple : "#B09DC7"
                  }
                  height={40}
                  fontSize={15}
                  borderRadius={60}
                  textColor={colors.white}
                  fontFamily="inter"
                  fontWeight="medium"
                  lSpacing={undefined}
                >
                  {item}
                </CustomButton>
              );
            })}
          </View>
          {partialLoaded ? (
            cafBoxes ? (
              cafBoxes.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    width: dimensions.width,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: colors.darkgray,
                      fontFamily: "inter",
                      fontSize: 20,
                    }}
                  >
                    {"No Cafeterias Are Serving\nYour Favourites :("}
                  </Text>
                </View>
              ) : (
                <ScrollView
                  horizontal={true}
                  style={{ flex: 1, paddingVertical: 15, marginLeft: "5%" }}
                >
                  {cafBoxes.map((item) => {
                    return (
                      <MainCafBox
                        onPress={() => {
                          router.push({
                            pathname: "/(tabs)/cafeteria",
                            params: {
                              cafName: item.cafName,
                              role: user?.role,
                              allergies: user?.allergies,
                              favouriteFoods: user?.favouriteFoods,
                            },
                          });
                        }}
                        key={item.cafName}
                        cafName={item.cafName}
                        source={item.source}
                      />
                    );
                  })}
                </ScrollView>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  width: dimensions.width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.darkgray,
                    fontFamily: "inter",
                    fontSize: 20,
                  }}
                >
                  Allow Location Services For{"\n"}Access To This Feature!
                </Text>
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                animating={!partialLoaded}
                color={colors.wpurple}
              ></ActivityIndicator>
            </View>
          )}
        </SafeAreaView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 32,
    fontWeight: "500",
    textAlign: "left",
    letterSpacing: -0.2,
  },
  cafTitle: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 26,
    fontWeight: "500",
    textAlign: "left",
    marginLeft: 10,
  },
  subtitle: {
    color: colors.darkgray,
    fontFamily: "inter",
    fontSize: 20,
    fontWeight: "medium",
    marginTop: 5,
    textAlign: "left",
  },
});
