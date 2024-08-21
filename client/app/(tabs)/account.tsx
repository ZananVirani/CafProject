import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState, createContext, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "@/components/TextField";
import { Checkbox } from "react-native-paper";
import { Dialog } from "react-native-simple-dialogs";
import CustomDropdown from "@/components/CustomDropdown";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Octicons } from "@expo/vector-icons";

export default function AccountInfo() {
  const resList = useSelector((state: RootState) => state.resList);
  const dimensions = useWindowDimensions();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstError, setFirstError] = useState(false);
  const [secondError, setSecondError] = useState(false);
  const [thirdError, setThirdError] = useState(false);
  const [dialog, setDialog] = useState(false);

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
      <Dialog
        visible={dialog}
        title="All Set!"
        titleStyle={styles.dialog}
        onRequestClose={() => {}}
        contentInsetAdjustmentBehavior={undefined}
        animationType="fade"
        dialogStyle={{
          borderRadius: 20,
          width: dimensions.width * 0.7,
          alignSelf: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Octicons name="check-circle-fill" size={70} color={"green"} />
          <View
            style={{
              width: "100%",
              marginTop: 20,
            }}
          >
            <Text style={styles.subdialog} numberOfLines={2}>
              Ready To{"\n"}Start Exploring
            </Text>
          </View>
        </View>
        <CustomButton
          onPress={() => {
            setDialog(false);
            router.push("(tabs)/main_screen");
          }}
          borderRadius={15}
          marginHorizontal={0}
          fontSize={16}
          height={50}
          buttonColor={colors.wpurple}
          marginTop={25}
        >
          Get Started
        </CustomButton>
      </Dialog>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.title}>Account Setup</Text>
        </View>
        <View style={{ flex: 0.78 }}>
          <TextField
            placeText="First Name"
            marginTop="7%"
            onChangeText={(text: React.SetStateAction<string>) => {
              setFirstName(text);
            }}
          ></TextField>
          <View
            style={{
              height: 30,
              width: "80%",
              justifyContent: "center",
              alignSelf: "center",
              marginLeft: 30,
            }}
          >
            {firstError && (
              <Text style={styles.error}>Please Enter First Name</Text>
            )}
          </View>
          <TextField
            placeText="Last Name"
            marginTop={0}
            onChangeText={(text: React.SetStateAction<string>) => {
              setLastName(text);
            }}
          ></TextField>
          <View
            style={{
              height: 30,
              width: "80%",
              justifyContent: "center",
              alignSelf: "center",
              marginLeft: 30,
            }}
          >
            {secondError && (
              <Text style={styles.error}>Please Enter Last Name</Text>
            )}
          </View>
          <View
            style={{
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
          <CustomDropdown setThirdError={setThirdError}></CustomDropdown>
          <View
            style={{
              height: 25,
              width: "80%",
              alignSelf: "center",
            }}
          >
            {thirdError && (
              <Text style={styles.error}>
                Please Select At Least One Cafeteria
              </Text>
            )}
          </View>
        </View>
        <View style={{ flex: 0.12 }}>
          <CustomButton
            onPress={() => {
              firstName ? setFirstError(false) : setFirstError(true);
              lastName ? setSecondError(false) : setSecondError(true);
              if (resList.resList.length == 0) setThirdError(true);

              if (firstName && lastName && resList.resList.length != 0)
                setDialog(true);
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
  dialog: {
    fontFamily: "inter",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
  title: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "500",
    fontSize: 36,
    position: "absolute",
    bottom: 0,
    marginLeft: "12%",
  },
  subdialog: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: colors.darkgray,
    fontFamily: "inter",
    fontStyle: "italic",
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
  error: {
    color: "red",
    fontSize: 13,
  },
});