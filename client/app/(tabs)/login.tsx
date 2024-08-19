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

export default function Login() {
  const dimensions = useWindowDimensions();
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
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
              //ID && password ? router.push("(tabs)/account") : setError(true);
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
