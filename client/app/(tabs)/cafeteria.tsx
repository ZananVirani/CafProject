import {
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
import CafAppBar from "@/components/CafAppBar";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import Toggle from "@imcarlosguerrero/react-native-switch-toggle";
import { router } from "expo-router";
import { Dialog } from "react-native-simple-dialogs";
import CustomButton from "@/components/CustomButton";

export default function Cafeteria() {
  const dimensions = useWindowDimensions();
  const testFoods = [
    ["Grilled Cheese Sandwich", 4.3],
    ["Hot Dog", 1.4],
    ["Popcorn Chicken", 3.1],
    ["Mac And Cheese", 3.8],
  ];
  const categories = ["Favourites", "Hot Food", "Interactive"];
  const [toggle, setToggle] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [bottomPop, setBottomPop] = useState(false);
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
            <View
              style={{
                width: "100%",
                marginTop: 20,
              }}
            >
              <Text style={styles.subdialog} numberOfLines={1}>
                Will Open Again At:
              </Text>
              <Text style={styles.subdialog} numberOfLines={1}>
                Something
              </Text>
            </View>
          </View>
          <CustomButton
            onPress={() => {
              setDialog(false);
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
        <CafAppBar />
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
              <Text style={styles.text}>Regular Hours:</Text>
              <Text style={styles.subtext}>Weekdays: 7:30am - 11:00pm</Text>
              <Text style={styles.subtext}>Weekends: 7:30am - 7:30pm</Text>
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
                Show Restrictions:
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
            categories.map((category, index) => {
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
                    {testFoods.map((item) => {
                      return (
                        <FoodBox
                          onPress={() => {}}
                          key={item}
                          name={item[0]}
                          rating={item[1]}
                          fontSize={12}
                          width={dimensions.width * 0.29}
                          minWidth={113.1}
                        />
                      );
                    })}
                  </View>
                </View>
              );
            })
            // <View
            //   style={{
            //     height: dimensions.height * 0.7,
            //     justifyContent: "center",
            //     alignItems: "center",
            //   }}
            // >
            //   <Text
            //     style={{
            //       color: colors.black,
            //       fontSize: 23,
            //       fontFamily: "inter",
            //       fontWeight: "500",
            //       marginLeft: 8,
            //       textAlign: "center",
            //     }}
            //   >
            //     Sorry! This Cafeteria Is Closed :{"("}
            //     {"\n"}Come Back Soon!
            //   </Text>
            // </View>
          }
        </ScrollView>
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
                Caf Is Closed :{"("}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );

  function getCafOpen() {
    const date = new Date();
    return (
      CafStuff.getBreakfast(date) ||
      CafStuff.getLunch(date) ||
      CafStuff.getLateLunch(date) ||
      CafStuff.getDinner(date) ||
      CafStuff.getSnackBar(date)
    );
  }
}

const styles = StyleSheet.create({
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

// TODO: Caf Closed Screen

class CafStuff {
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
