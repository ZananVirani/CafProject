/**
 * Login screen for the app.
 */

import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState, createContext, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "@/components/TextField";

import { router } from "expo-router";
import axios from "axios";
import { setUserID } from "@/utils/AsyncStorage";

export default function Login() {
  // Dimensions of the window
  const dimensions = useWindowDimensions();
  // Western ID and password entered by the user
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  // Error message to be displayed if the ID or password were not filled.
  const [error, setError] = useState(false);

  return (
    // TouchableWithoutFeedback is used to dismiss the keyboard when the user taps outside of the text fields.
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 0.1, marginTop: 20 }}>
            <Text style={styles.title}>Western Login</Text>
          </View>
          <View style={{ flex: 0.32, marginTop: dimensions.height * 0.05 }}>
            <TextField
              placeText="Western ID"
              marginTop="7%"
              onChangeText={(text: React.SetStateAction<string>) => {
                setID(text);
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
            ></View>
            <TextField
              placeText="Password"
              marginTop={0}
              onChangeText={(text: React.SetStateAction<string>) => {
                setPassword(text);
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
              {error && (
                <Text style={styles.error}>
                  Your ID and Password Do Not Match
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 0.46,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../assets/images/western-brand.png")}
              style={{ height: "74%", objectFit: "contain" }}
            ></Image>
          </View>
          <CustomButton
            onPress={() => {
              // If the ID or password are not filled, display an error message, otherwise, check if the user exists in the database.
              // If the user exists, then push it to the main screen, otherwise, push it to the account screen.
              if (!ID || !password) setError(true);
              else {
                axios
                  .get(`http://10.0.0.135:3000/users/getUser/${ID}`)
                  .then(async (value) => {
                    await setUserID(value.data.studentId);
                    router.replace("/(tabs)/main_screen");
                  })
                  .catch((e) => {
                    router.replace({
                      pathname: "/(tabs)/account",
                      params: {
                        studentId: ID,
                        password: password,
                      },
                    });
                  });
              }
            }}
            borderRadius={16}
            buttonColor={colors.wpurple}
          >
            Continue
          </CustomButton>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
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

  error: {
    color: "red",
    fontSize: 13,
  },
});
