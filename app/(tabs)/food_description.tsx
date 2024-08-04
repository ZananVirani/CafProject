import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Suspense, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CafAppBar from "@/components/CafAppBar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { Collapsible } from "@/components/Collapsible";
import { Dialog } from "react-native-simple-dialogs";
import StarRating from "react-native-star-rating-widget";
import CustomButton from "@/components/CustomButton";

export default function food_description() {
  const dimensions = useWindowDimensions();
  const allergies = ["Meat", "Gluten", "Pork", "Dairy", "Seafood", "Nuts"];
  const [checked, setChecked] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <View
      style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}
    >
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
            onPress={() => {
              console.log(rating);
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
        <CafAppBar />
        <ScrollView>
          <Image
            source={require("../../assets/images/grilled_cheese.png")}
            style={{
              //flex: 0.4,
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
                <Text style={styles.title} numberOfLines={2}>
                  Mac and Cheese
                </Text>
              </View>
              <MaterialCommunityIcons
                color={checked ? colors.wpurple : colors.gray}
                name={"heart-circle"}
                size={50}
                onPress={() => {
                  setChecked(!checked);
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
              <Text style={styles.rating}>4.5</Text>
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
            <Collapsible title="Food Restrictions">
              <View style={{ marginVertical: 3, width: "100%" }}>
                <Text style={[styles.allergy, { textAlign: "left" }]}>
                  This dish contains the following:
                </Text>
              </View>
              {allergies.map((item) => {
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
                    <Text style={[styles.allergy, { fontWeight: "semibold" }]}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </Collapsible>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  title: {
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
