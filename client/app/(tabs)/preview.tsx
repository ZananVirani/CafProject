/**
 * Preview Screen, where a preview of what the students will see when the menu is uploaded is displayed to
 * cafeteria staff before they actually upload the menu. This screen also allows the cafeteria staff to save
 * the menu as a new preset, edit the current preset, or upload the menu temporarily.
 */

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../constants/Colors";
import FoodBox from "@/components/FoodBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Dialog } from "react-native-simple-dialogs";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { presetState } from "@/state/presets/presetSlice";
import { RootState } from "@/state/store";
import axios from "axios";
import { clear } from "@/state/presets/presetSlice";

export default function Preview() {
  // Get the preset name and cafeteria name from the global search params
  const { presetName, cafName } = useGlobalSearchParams();
  // Get the window dimensions
  const dimensions = useWindowDimensions();
  // Get the preset list from the preset slice and dispatch
  const presetList: presetState = useSelector(
    (state: RootState) => state.presetList
  );
  const dispatch = useDispatch();
  // Local state to manage if the dialog should be displayed or not.
  const [dialog, setDialog] = useState(false);
  // Categories of food
  const categories = ["Hot Food", "Interactive"];
  // Name of the new preset, if the user chooses to save the menu as a new preset.
  const [nameText, setNameText] = useState("");
  // Error state to manage if the user has not entered a name for the new preset.
  const [error, setError] = useState(false);
  // Loaded state.
  const [loaded, setLoaded] = useState(false);

  // Set a timeout to set the loaded state to true after 500ms, so items can load in properly.
  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Dialog to enter the name of the new preset */}
      <Dialog
        visible={dialog}
        title="Name of New Preset"
        titleStyle={styles.dialog}
        onTouchOutside={() => {
          setDialog(false);
          setError(false);
          setNameText("");
        }}
        onRequestClose={() => {}}
        contentInsetAdjustmentBehavior={undefined}
        animationType="fade"
        dialogStyle={{ borderRadius: 20 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              mode="flat"
              placeholder={"Type Here..."}
              placeholderTextColor={colors.gray}
              onChangeText={(text: string) => {
                setNameText(text);
              }}
              activeOutlineColor={colors.wpurple}
              outlineColor={colors.verylightgray}
              textColor="black"
              style={{
                backgroundColor: colors.verylightgray,
                width: "90%",
              }}
            ></TextInput>
          </View>
          <View
            style={{
              width: "90%",
              height: 30,

              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {error && (
              <Text style={{ fontSize: 13, color: "red" }}>
                Please Enter A Name.
              </Text>
            )}
          </View>
          <CustomButton
            onPress={() => {
              // Error checking and confirmation alert
              nameText.length == 0
                ? setError(true)
                : Alert.alert(
                    `Are You Sure You Want To Create New Preset And Upload Menu?`,
                    `Preset Name Will Be:\n${nameText}`,
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: async () => {
                          let menu: string[] = [];
                          presetList.presetList.forEach((item) => {
                            menu.push(item._id);
                          });
                          setDialog(false);
                          await axios
                            .post(`http://10.0.0.135:3000/presets/${cafName}`, {
                              presetName: nameText,
                              foodIDs: menu,
                            })
                            .then((result) => {
                              Alert.alert(
                                "Menu Uploaded Successfully",
                                undefined,
                                [
                                  {
                                    text: "OK",
                                    onPress: () => {
                                      router.dismissAll();
                                      router.setParams({ cafName: cafName });
                                      dispatch(clear());
                                    },
                                  },
                                ]
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
                        },
                      },
                    ]
                  );
            }}
            borderRadius={15}
            marginHorizontal="6%"
            fontSize={16}
            height={50}
            width="90%"
          >
            Upload
          </CustomButton>
        </View>
      </Dialog>
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
          <Text style={styles.title} numberOfLines={1}>
            {cafName}
          </Text>
        </View>
      </View>
      {loaded ? (
        <ScrollView>
          {categories.map((category, index) => {
            return (
              <View key={category}>
                <View
                  style={{
                    paddingLeft: "3.5%",
                    width: dimensions.width,
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: index == 0 ? 8 : 23,
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
                    // Map through the preset list and display the food boxes.
                    presetList.presetList.map((item, index) => {
                      return category == item.type ? (
                        <FoodBox
                          onPress={() => {
                            router.push({
                              pathname: "/(tabs)/food_description",
                              params: {
                                itemName: item.name,
                              },
                            });
                          }}
                          source={`http://10.0.0.135:3000/images/${item.image}`}
                          key={index}
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

          <View style={{ width: dimensions.width, height: 230 }}></View>
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
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: dimensions.width,
          marginBottom: presetName ? 170 : 85,
        }}
      >
        {/* Button to save as a new preset and upload */}
        <CustomButton
          onPress={() => {
            setDialog(true);
          }}
          borderRadius={14}
          marginVertical={presetName ? 0 : 20}
          buttonColor={colors.darkgray}
        >
          Save As New & Upload
        </CustomButton>
      </View>
      {
        // If the user had chosen a preset in the 'menu' screen, display the 'edit preset and upload' button.
        presetName && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: dimensions.width,
              marginBottom: 85,
            }}
          >
            <CustomButton
              onPress={() => {
                Alert.alert(
                  `Are You Sure You Want To Edit Current Preset And Upload Menu?`,
                  undefined,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: async () => {
                        let menu: string[] = [];
                        presetList.presetList.forEach((item) => {
                          menu.push(item._id);
                        });
                        await axios
                          .patch(
                            `http://10.0.0.135:3000/presets/editPreset/${cafName}`,
                            {
                              presetName: presetName,
                              foodIDs: menu,
                            }
                          )
                          .then((result) => {
                            Alert.alert(
                              "Menu Uploaded Successfully",
                              undefined,
                              [
                                {
                                  text: "OK",
                                  onPress: () => {
                                    router.dismissAll();
                                    router.setParams({ cafName: cafName });
                                    dispatch(clear());
                                  },
                                },
                              ]
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
                      },
                    },
                  ]
                );
              }}
              borderRadius={14}
              marginVertical={20}
            >
              Edit Preset & Upload
            </CustomButton>
          </View>
        )
      }
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: dimensions.width,
          marginBottom: 40,
        }}
      >
        {/* Button to upload the menu temporarily, no edits to the presets will be made. */}
        <CustomButton
          onPress={() => {
            Alert.alert(`Are You Sure You Want To Upload Menu?`, undefined, [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "OK",
                onPress: async () => {
                  let menu: string[] = [];
                  presetList.presetList.forEach((item) => {
                    menu.push(item._id);
                  });
                  await axios
                    .patch(
                      `http://10.0.0.135:3000/presets/tempUpload/${cafName}`,
                      {
                        foodIDs: menu,
                      }
                    )
                    .then((result) => {
                      Alert.alert("Menu Uploaded Successfully", undefined, [
                        {
                          text: "OK",
                          onPress: () => {
                            router.dismissAll();
                            router.setParams({ cafName: cafName });
                            dispatch(clear());
                          },
                        },
                      ]);
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
                },
              },
            ]);
          }}
          borderRadius={14}
          marginVertical={0}
          buttonColor={colors.wpurple}
        >
          Temporary Upload
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  title: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 33,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
    marginRight: 15,
  },
  dialog: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 5,
  },
});
