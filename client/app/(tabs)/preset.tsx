import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useGlobalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { ActivityIndicator, TextInput } from "react-native-paper";
import FoodBox from "@/components/FoodBox";
import ItemAdd from "@/components/ItemAdd";
import { useDispatch, useSelector } from "react-redux";
import { add, clear, presetState, rid } from "@/state/presets/presetSlice";
import { RootState } from "@/state/store";
import axios from "axios";

export default function Preset() {
  const presetList: presetState = useSelector(
    (state: RootState) => state.presetList
  );
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const { presetName, cafName } = useGlobalSearchParams();

  const categories = ["Hot Food", "Interactive"];
  const [title, setTitle] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getPresetMenu = async () => {
    await axios
      .get(`http://10.0.0.135:3000/presets/getPreset/${presetName}`)
      .then((result) => {
        result.data.forEach(
          (item: {
            _id: string;
            name: string;
            image: string;
            allergies: string[];
            type: string;
            averageRating: Number;
            cafeterias: string[];
          }) => {
            dispatch(add(item));
          }
        );
      })
      .catch((error) => {
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

  useEffect(() => {
    if (presetName && typeof presetName == "string") {
      setTitle(presetName);
      getPresetMenu();
    }
    setLoaded(true);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "7%",
            marginBottom: "3%",
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
              onPress={() => {
                dispatch(clear());
                router.back();
              }}
            />
            <Text style={styles.title} numberOfLines={2}>
              {title ? title : "New Menu"}
            </Text>
          </View>
        </View>
        {loaded ? (
          <>
            <ScrollView>
              <View
                style={{
                  width: dimensions.width,
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                  flexDirection: "row",
                }}
              >
                <ItemAdd
                  onPress={() => {
                    router.push("/(tabs)/upload");
                  }}
                  text="Create New Item"
                  marginRight={30}
                  iconName="plus"
                />
                <ItemAdd
                  onPress={() => {
                    router.push("/(tabs)/item_select");
                  }}
                  text="Choose Item"
                  iconName="mouse-pointer"
                />
              </View>

              {categories.map((category) => {
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
                            ? "fire" //
                            : category == "Interactive"
                            ? "food-turkey" //"filter"
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
                      {presetList.presetList.map((item: any, index: any) => {
                        return category == item.type ? (
                          <FoodBox
                            onPress={() => {
                              router.push("/(tabs)/food_description");
                              router.setParams({ itemName: item.name });
                            }}
                            key={index}
                            name={item.name}
                            source={`http://10.0.0.135:3000/images/${item.image}`}
                            rating={item.averageRating}
                            fontSize={12}
                            width={dimensions.width * 0.29}
                            minWidth={113.1}
                            onDelete={() => {
                              Alert.alert(
                                `Are You Sure You Want To Delete ${item.name} From The Menu?`,
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
                                      dispatch(rid(item));
                                    },
                                  },
                                ]
                              );
                            }}
                          />
                        ) : null;
                      })}
                    </View>
                  </View>
                );
              })}
              <View style={{ width: dimensions.width, height: 100 }}></View>
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
                onPress={() => {
                  router.push("/(tabs)/preview");
                  router.setParams({
                    presetName: title ? title : undefined,
                    cafName: cafName,
                  });
                }}
                borderRadius={20}
                buttonColor={colors.wpurple}
              >
                Preview Menu
              </CustomButton>
            </View>
          </>
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
      </SafeAreaView>
    </View>
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
