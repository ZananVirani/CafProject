import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../constants/Colors";
import { router } from "expo-router";
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

export default function MainScreen() {
  const dimensions = useWindowDimensions();
  const testFoods = [
    ["Grilled Cheese Sandwich", 4.3],
    ["Hot Dog", 1.4],
    ["Popcorn Chicken", 3.1],
    ["Mac And Cheese", 3.8],
    ["Freak Sandwich", 4.1],
    ["Navan Sehra Asscheeks and butt", 6.0],
  ];

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([""]);
  const cafs = ["Sydenham Hall", "Ontario Hall", "Perth Hall"];
  const [cafNum, setCafNum] = useState(0);
  const [filterChosen, setFilterChosen] = useState(categories[0]);
  const cafBoxes = [
    { cafName: "Sydenham Hall", rating: 4.3, liked: true },
    { cafName: "Perth Hall", rating: 4.0, liked: false },
    { cafName: "Ontario Hall", rating: 5.0, liked: true },
  ];

  useEffect(() => {
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
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
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
              //router.push("(tabs)/onboarding")
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
          <TouchableOpacity onPress={async () => {}} style={{ flex: 1 }}>
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
          {testFoods.map((item) => {
            return (
              <FoodBox
                onPress={() => {
                  //router.push("(tabs)/food_description");
                }}
                key={item}
                name={item[0]}
                rating={item[1]}
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
                buttonColor={item == filterChosen ? colors.wpurple : "#B09DC7"}
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
                key={item.cafName}
                liked={item.liked}
                rating={item.rating}
                cafName={item.cafName}
              />
            );
          })}
          <View style={{ width: dimensions.width * 0.16 }}></View>
        </ScrollView>
      </SafeAreaView>
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
