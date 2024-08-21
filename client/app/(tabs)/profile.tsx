import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import colors from "../../constants/Colors";
import { router } from "expo-router";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import ProfileButton from "@/components/ProfileButton";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

export default function ProfileScreen() {
  const dimensions = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
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
              onPress={() => router.push("(tabs)/main_screen")}
            />
            <Text style={styles.title}>User Settings</Text>
          </View>
        </View>
        <View style={{ flex: 0.78, marginTop: 25 }}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
            }}
          >
            <ProfileButton text={"Account Information"}>
              <Feather name="user" size={45} color={colors.wpurple} />
            </ProfileButton>
            <ProfileButton text={"Favourite Foods"}>
              <MaterialCommunityIcons
                name="star-circle"
                size={45}
                color={colors.wpurple}
              />
            </ProfileButton>
            {/* <ProfileButton text={"Notifications"}>
              <MaterialCommunityIcons
                name="bell-ring"
                size={45}
                color={colors.wpurple}
              />
            </ProfileButton> */}
            <ProfileButton
              text={"Location"}
              onPress={async () => {
                let { status } =
                  await Location.requestForegroundPermissionsAsync();
                console.log(status);

                if (status == "granted") {
                  console.log("YESSS");
                } else {
                  console.log("NOOOOO");
                }
              }}
            >
              <Ionicons
                name="location-sharp"
                size={45}
                color={colors.wpurple}
              />
            </ProfileButton>
            <ProfileButton
              text={"Learn More"}
              onPress={async () => {
                await Linking.openURL("https://housing.uwo.ca/dining");
              }}
            >
              <MaterialCommunityIcons
                name="information"
                size={45}
                color={colors.wpurple}
              />
            </ProfileButton>
          </View>
        </View>
        <View style={{ flex: 0.12 }}>
          <CustomButton
            onPress={() => {
              router.push("/(tabs)/cafeteria");
            }}
            borderRadius={16}
            buttonColor={"#FFF2F3"}
            textColor="red"
            fontWeight={"regular"}
          >
            Logout
          </CustomButton>
        </View>
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
});