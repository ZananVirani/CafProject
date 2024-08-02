import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import CafAppBar from "@/components/CafAppBar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";

export default function food_description() {
  const dimensions = useWindowDimensions();
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
                  flex: 0.78,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.title} numberOfLines={2}>
                  Popcorn Chicken
                </Text>
              </View>
              <MaterialCommunityIcons
                color={colors.wpurple}
                name="heart-circle" //heart-circle-outline
                size={50}
                onPress={() => {}}
                style={{
                  position: "absolute",
                  right: 0,
                  alignSelf: "center",
                  flex: 0.22,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: "2%",
                marginTop: 10,
              }}
            >
              <Ionicons
                color={colors.yellow}
                name="star"
                size={20}
                onPress={() => {}}
              />
              <Text style={styles.rating}>4.5</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "medium",
    fontSize: 29,
  },
  rating: {
    color: colors.gray,
    fontSize: 18,
    marginLeft: 6,
  },
});
