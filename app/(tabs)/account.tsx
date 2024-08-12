import { StyleSheet, Text, View } from "react-native";
import React, { useState, createContext, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "@/components/TextField";
import { Checkbox } from "react-native-paper";
import CustomDropdown from "@/components/CustomDropdown";
import { router } from "expo-router";

export default function AccountInfo() {
  const [checked, setChecked] = useState(false);
  const [map, setMap] = useState(
    new Map<string, boolean>([
      ["Meat", false],
      ["Gluten", false],
      ["Pork", false],
      ["Dairy", false],
      ["Seafood", false],
      ["Nuts", false],
    ])
  );
  useEffect(() => {
    setMap(
      new Map<string, boolean>([
        ["Meat", false],
        ["Gluten", false],
        ["Pork", false],
        ["Dairy", false],
        ["Seafood", false],
        ["Nuts", false],
      ])
    );
  }, [checked]);
  const allergyList = ["Meat", "Gluten", "Pork", "Dairy", "Seafood", "Nuts"];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.title}>Account Setup</Text>
        </View>
        <View style={{ flex: 0.78 }}>
          <TextField
            placeText="First Name"
            marginTop="7%"
            onChangeText={() => {}}
          ></TextField>
          <TextField
            placeText="Last Name"
            marginTop={30}
            onChangeText={() => {}}
          ></TextField>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
            }}
          >
            <Text style={styles.subtitle}>Food Restrictions?</Text>
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              uncheckedColor={colors.wpurple}
              color={colors.wpurple}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
          {checked && (
            <View style={{ marginBottom: 6 }}>
              <Text style={styles.text}>Check the foods you can NOT eat</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "7%",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {allergyList.map((item) => {
              return (
                <CustomButton
                  key={item}
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
                  fontSize={13}
                  width={105}
                  borderRadius={60}
                  textColor={map.get(item) ? colors.white : colors.wpurple}
                  borderColor={colors.wpurple}
                  fontFamily="inter"
                  fontWeight="medium"
                  lSpacing={undefined}
                >
                  {item}
                </CustomButton>
              );
            })}
          </View>
          <CustomDropdown></CustomDropdown>
        </View>
        <View style={{ flex: 0.12 }}>
          <CustomButton
            onPress={() => {
              router.push("/(tabs)/cafeteria");
            }}
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
    fontSize: 36,
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
  text: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "regular",
    fontSize: 16,
    marginLeft: "12%",
    marginRight: 10,
    fontStyle: "italic",
  },
});
