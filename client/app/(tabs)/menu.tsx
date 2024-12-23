/**
 * Screen where cafeteria staff can either choose from an existing preset, or create a new menu.
 */

import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { format } from "date-fns";
import TextField from "@/components/TextField";
import PresetButton from "@/components/PresetButton";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";

export default function Menu() {
  // Dimensions of the screen
  const dimensions = useWindowDimensions();
  // Name of the cafeteria
  const { cafName } = useGlobalSearchParams();
  // Whether the user is in select mode
  const [selectMode, setSelectMode] = useState(false);
  // Current date
  const date = format(new Date(), "yyyy/MM/dd");
  // All presets available to the cafeteria.
  const [allPresets, setAllPresets] = useState<String[]>([]);
  // Presets that are currently displayed on the screen, according to search text.
  const [presets, setPresets] = useState(allPresets);
  // Search text.
  const [searchText, setSearchText] = useState("");
  // Presets that are selected for deletion.
  const [deletedPresets, setDeletedPresets] = useState(new Set());
  // Whether the presets have been loaded.
  const [loaded, setLoaded] = useState(false);

  // Fetch the presets from the backend.
  const getPresets = async () => {
    await axios
      .get(`http://${Constants.expoConfig!.extra!.apiUrl}/presets/${cafName}`)
      .then((result) => {
        setAllPresets(result.data);
        setLoaded(true);
        setPresets(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPresets();
  }, []);

  // Update the presets shown on the screen according to the search text.
  useEffect(() => {
    setPresets(
      allPresets.filter((item) => {
        return item.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText]);

  return (
    // TouchableWithoutFeedback is used to dismiss the keyboard when the user taps outside of the text field.
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
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
            <Text style={styles.title}>Menu Upload</Text>
          </View>
        </View>
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}

        {loaded ? (
          <>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: "10%",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <View style={{ width: "50%", flexDirection: "row" }}>
                {/* Toggle between select mode on and off */}
                <CustomButton
                  onPress={() => {
                    setSelectMode(!selectMode);
                  }}
                  marginVertical={0}
                  marginHorizontal={3}
                  buttonColor={selectMode ? colors.wpurple : colors.white}
                  height={40}
                  fontSize={15}
                  borderRadius={60}
                  textColor={selectMode ? colors.white : colors.wpurple}
                  borderColor={colors.wpurple}
                  fontFamily="inter"
                  fontWeight="medium"
                  lSpacing={undefined}
                >
                  {selectMode ? "Unselect" : "Select"}
                </CustomButton>

                {selectMode && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        // Alert the user to confirm deletion of the selected presets.
                        Alert.alert(
                          `Are You Sure You Want To Delete The Selected Presets?`,
                          undefined,
                          [
                            {
                              text: "Cancel",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Delete",
                              onPress: async () => {
                                if (deletedPresets.size > 0) {
                                  axios
                                    .patch(
                                      `http://${
                                        Constants.expoConfig!.extra!.apiUrl
                                      }/presets/deletePresets/${cafName}`,
                                      {
                                        presetNames: Array.from(deletedPresets),
                                      }
                                    )
                                    .then((result) => {
                                      const newPresets = allPresets.filter(
                                        (item) => {
                                          return !deletedPresets.has(item);
                                        }
                                      );

                                      const otherPresets = presets.filter(
                                        (item) => {
                                          return !deletedPresets.has(item);
                                        }
                                      );

                                      setAllPresets(newPresets);
                                      setPresets(otherPresets);
                                      setDeletedPresets(new Set());

                                      Alert.alert(
                                        `Presets Deleted`,
                                        undefined,
                                        [
                                          {
                                            text: "Ok",
                                            onPress: () => {},
                                          },
                                        ]
                                      );
                                    })
                                    .catch((e) => {
                                      console.log(e);
                                      Alert.alert(
                                        `Something Went Wrong`,
                                        "Check Your Connection And Try Again",
                                        [
                                          {
                                            text: "Ok",
                                            onPress: () => {},
                                          },
                                        ]
                                      );
                                    });
                                }
                              },
                            },
                          ]
                        );
                      }}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: colors.black,
                        borderWidth: 1,
                        borderRadius: 50,
                        height: 40,
                        width: 40,
                        marginLeft: 5,
                      }}
                    >
                      <AntDesign
                        color="black"
                        name="delete"
                        size={22}
                        style={{}}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 16,
                    fontFamily: "inter",
                  }}
                  adjustsFontSizeToFit={true}
                >
                  {date}
                  {"\n"}
                  {cafName}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 14,
                marginTop: "5%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/preset",
                    params: {
                      cafName: cafName,
                    },
                  });
                }}
              >
                <View
                  style={{
                    width: dimensions.width * 0.4,
                    height: dimensions.width * 0.3,
                    backgroundColor: colors.wpurple,
                    borderTopRightRadius: 14,
                    borderTopLeftRadius: 14,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="plus"
                    color={colors.verylightgray}
                    size={60}
                  ></AntDesign>
                </View>
                <View
                  style={{
                    width: dimensions.width * 0.4,
                    height: dimensions.width * 0.1,
                    borderBottomRightRadius: 14,
                    borderBottomLeftRadius: 14,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.verylightgray,
                    borderWidth: 1,
                    borderColor: colors.gray,
                  }}
                >
                  <Text style={{ fontStyle: "italic", fontFamily: "inter" }}>
                    Create New Menu
                  </Text>
                </View>
              </TouchableOpacity>
              {/*NEXTTTTTTTTTTTTTTTT*/}
              {/*NEXTTTTTTTTTTTTTTTT*/}
              {/*NEXTTTTTTTTTTTTTTTT*/}
              {/*NEXTTTTTTTTTTTTTTTT*/}

              <View
                style={{
                  width: "100%",
                  marginVertical: "5%",
                  justifyContent: "center",
                }}
              >
                <TextField
                  placeText={"Search From Presets..."}
                  onChangeText={(text: any) => {
                    setSearchText(text);
                  }}
                  style={{ paddingRight: 40 }}
                ></TextField>
                <AntDesign
                  name="search1"
                  color={colors.gray}
                  size={25}
                  style={{
                    position: "absolute",
                    right: 0,
                    marginRight: dimensions.width * 0.1 + 25,
                  }}
                />
              </View>
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: dimensions.width * 0.8,
                  }}
                >
                  {
                    // Display all the presets available to the cafeteria.
                    presets.map((item, index) => {
                      return (
                        <PresetButton
                          key={index}
                          text={item}
                          index={index}
                          selected={selectMode && deletedPresets.has(item)}
                          onPress={() => {
                            selectMode ? toggleSelect(item) : visitPreset(item);
                          }}
                        />
                      );
                    })
                  }
                </View>
                <View style={{ height: 270 }}></View>
              </ScrollView>
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
    </TouchableWithoutFeedback>
  );

  // Toggle the selection of a preset to be deleted.
  function toggleSelect(item: String) {
    let tempPresets = new Set(deletedPresets);
    tempPresets.has(item) ? tempPresets.delete(item) : tempPresets.add(item);

    setDeletedPresets(tempPresets);
  }

  // Visit the preset screen.
  function visitPreset(item: String) {
    router.push({
      pathname: "/(tabs)/preset",
      params: {
        presetName: item.toString(),
        cafName: cafName,
      },
    });
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
});
