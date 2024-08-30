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
  setFilters,
  setSelectedCaf,
} from "@/utils/AsyncStorage";
import MainCafBox from "@/components/MainCafBox";
import { ActivityIndicator } from "react-native-paper";

export default function MainScreen() {
  const dimensions = useWindowDimensions();
  const [foods, setFoods] = useState<
    Map<
      string,
      {
        _id: string;
        name: string;
        image: string;
        allergies: string[];
        type: string;
        averageRating: Number;
        cafeterias: string[];
      }[]
    >
  >(new Map());

  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState([""]);
  const cafs = ["Delaware Hall", "Perth Hall"];
  const [cafNum, setCafNum] = useState(0);
  const [filterChosen, setFilterChosen] = useState(categories[0]);
  const cafBoxes = [
    {
      cafName: "Ontario Hall",
      source: require("../../assets/images/ontario_caf.jpg"),
    },
    {
      cafName: "Sydenham Hall",
      source: require("../../assets/images/sydenham_caf.png"),
    },
    {
      cafName: "Perth Hall",
      source: require("../../assets/images/perth_caf.jpg"),
    },

    {
      cafName: "Delaware Hall",
      source: require("../../assets/images/delaware_caf.png"),
    },
    {
      cafName: "Elgin Hall",
      source: require("../../assets/images/elgin_caf.png"),
    },
    {
      cafName: "Essex Hall",
      source: require("../../assets/images/essex_caf.png"),
    },
    {
      cafName: "Saugeen Hall",
      source: require("../../assets/images/saugeen_caf.jpg"),
    },
  ];

  const getFoods = () => {
    let newMap = new Map<
      string,
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
    cafs.forEach(async (name) => {
      await axios
        .get(`http://10.0.0.136:3000/cafeterias/getFood/${name}`)
        .then((result) => {
          newMap.set(name, result.data);
        })
        .catch((error) => console.log(error));
    });

    setFoods(newMap);
  };

  useEffect(() => {
    //getFoods()
    getSelectedCaf()
      .then((value) => {
        value >= cafs.length ? setCafNum(0) : setCafNum(value);
      })
      .catch((error) => {
        console.log(error);
      });
    getFilters()
      .then((value) => {
        setCategories(value);
        setFilterChosen(value[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoaded(false);
      getFoods();
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
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
          {/* Header//////////////////////////// */}
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
              <Text style={styles.title} numberOfLines={1}>
                Hi, Shriraam
              </Text>
              <Text style={styles.subtitle}>Check Out What's Cooking</Text>
            </View>
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
          {/* Header//////////////////////////// */}
          {/* First DIPLAY ROWWWW /////////////////////////////// */}
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
              <Ionicons
                name="shuffle"
                size={33}
                color={colors.gray}
                onPress={async () => {
                  let newNum = (cafNum + 1) % cafs.length;
                  setCafNum(newNum);
                  await setSelectedCaf(newNum);
                }}
              />
              <Text style={styles.cafTitle}>{cafs[cafNum]}</Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                router.push("/(tabs)/cafeteria");
                router.setParams({ cafName: cafs[cafNum] });
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
            {foods.get(cafs[cafNum])?.map((item, index) => {
              return (
                <FoodBox
                  onPress={() => {
                    router.push("/(tabs)/food_description");
                    router.setParams({
                      cafName: cafs[cafNum],
                      itemName: item.name,
                    });
                  }}
                  key={index}
                  source={`http://10.0.0.136:3000/images/${item.image}`}
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
              );
            })}
            <View style={{ width: dimensions.width * 0.18 }}></View>
          </ScrollView>
          {/* First DIPLAY ROWWWW /////////////////////////////// */}
          <View
            style={{
              width: dimensions.width,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "5%",
              marginTop: "6%",
            }}
          >
            <Text style={styles.cafTitle}>All Residences</Text>
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
            {categories.map((item) => {
              return (
                <CustomButton
                  key={item}
                  onPress={() => {
                    setFilterChosen(item);
                  }}
                  marginVertical={10}
                  marginHorizontal={7}
                  buttonColor={
                    item == filterChosen ? colors.wpurple : "#B09DC7"
                  }
                  height={40}
                  fontSize={14}
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
          <ScrollView
            horizontal={true}
            style={{ flex: 1, paddingVertical: 15, marginLeft: "5%" }}
          >
            {cafBoxes.map((item) => {
              return (
                <MainCafBox
                  onPress={() => {
                    router.push("/(tabs)/cafeteria");
                    router.setParams({ cafName: item.cafName });
                  }}
                  key={item.cafName}
                  cafName={item.cafName}
                  source={item.source}
                  //liked={item.liked}
                />
              );
            })}
          </ScrollView>
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
