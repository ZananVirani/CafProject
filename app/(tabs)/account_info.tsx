import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import CustomButton from "@/components/CustomButton";
import colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "@/components/TextField";
import { Checkbox } from "react-native-paper";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

export default function AccountInfo() {
  const [checked, setChecked] = useState(false);
  const allergyMap = new Map<string, boolean>([
    ["Vegan", false],
    ["Gluten", false],
    ["Halal", false],
    ["Lactose", false],
    ["Seafood", false],
    ["Vegetarian", false],
  ]);
  const [map, setMap] = useState(allergyMap);
  const allergyList = [
    "Vegan",
    "Gluten",
    "Halal",
    "Lactose",
    "Seafood",
    "Vegetarian",
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.title}>Account Setup</Text>
        </View>
        <View style={{ flex: 0.75 }}>
          <TextField placeText="First Name" marginTop="10%"></TextField>
          <TextField placeText="Last Name" marginTop={30}></TextField>
          <View
            style={{
              marginTop: 30,
              marginBottom: 10,
              flexDirection: "row",
            }}
          >
            <Text style={styles.subtitle}>Allergies?</Text>
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              uncheckedColor={colors.wpurple}
              color={colors.wpurple}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: "4%",
              flexWrap: "wrap",
            }}
          >
            {allergyList.map((item) => {
              return (
                <CustomButton
                  onPress={() => {
                    let newValue = !map.get(item);
                    setMap(
                      new Map<string, boolean>([...map, [item, newValue]])
                    );
                  }}
                  disabled={!checked}
                  marginVertical={10}
                  marginHorizontal={2.8}
                  buttonColor={map.get(item) ? colors.wpurple : colors.white}
                  height={40}
                  fontSize={item == "Vegetarian" ? 12.5 : 13}
                  width={110}
                  borderRadius={60}
                  textColor={map.get(item) ? colors.white : colors.wpurple}
                  borderColor={colors.wpurple}
                  fontFamily="inter"
                  fontWeight="medium"
                  lSpacing={item == "Vegetarian" ? -0.5 : undefined}
                >
                  {item}
                </CustomButton>
              );
            })}
          </View>
        </View>
        <View style={{ flex: 0.15 }}>
          <CustomButton
            onPress={() => {}}
            borderRadius={16}
            buttonColor={colors.wpurple}
          >
            Get Started
          </CustomButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "500",
    fontSize: 34,
    position: "absolute",
    bottom: 0,
    marginLeft: "12%",
  },
  subtitle: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "regular",
    fontSize: 24,
    marginLeft: "12%",
    marginRight: 10,
  },
});
