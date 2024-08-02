import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import CafAppBar from "@/components/CafAppBar";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import { Collapsible } from "@/components/Collapsible";

export default function food_description() {
  const dimensions = useWindowDimensions();
  let ing = ["1 cup salt", "1 cup rice"];

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
                color={colors.wpurple}
                name="heart-circle" //heart-circle-outline
                size={50}
                onPress={() => {}}
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
            </View>
            <Collapsible title="Ingredients">
              <Text>
                This app has two screens: <Text>app/(tabs)/index.tsx</Text> and{" "}
                <Text>app/(tabs)/explore.tsx</Text>
              </Text>
              <Text>
                The layout file in <Text>app/(tabs)/_layout.tsx</Text> sets up
                the tab navigator.
              </Text>
            </Collapsible>
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
    fontSize: 31,
    letterSpacing: -0.3,
  },
  rating: {
    color: colors.gray,
    fontSize: 18,
    marginLeft: 6,
  },
});
