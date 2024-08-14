import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import TextField from "@/components/TextField";
import FoodBox from "@/components/FoodBox";

export default function UploadScreen() {
  const dimensions = useWindowDimensions();
  const [filterChosen, setFilterChosen] = useState("");
  const categories = ["Hot Food", "Interactive"];
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
  const allergyList = ["Meat", "Gluten", "Pork", "Dairy", "Seafood", "Nuts"];
  const [foodName, setFoodName] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
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
              onPress={() => router.back()}
            />
            <Text style={styles.title}>Upload Item</Text>
          </View>
        </View>
        {/*HEADERRRRRRRRRRRRRRRRRRRRRRR*/}
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FoodBox
              onPress={() => {}}
              name={foodName}
              rating={0}
              fontSize={12}
              width={dimensions.width * 0.29}
              minWidth={113.1}
            />
          </View>
        </View>
        <TouchableOpacity style={{ marginTop: 15, alignItems: "center" }}>
          <Text style={[styles.subtitle, { color: "blue" }]}>Change Image</Text>
        </TouchableOpacity>

        {/*NEXTTTTTTTTTTTTT*/}
        <TextField
          placeText="Item Name"
          marginTop="7%"
          onChangeText={(text: React.SetStateAction<string>) => {
            setFoodName(text);
          }}
        ></TextField>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: dimensions.width,
              alignItems: "center",
            }}
          >
            <Text style={styles.subtitle}>Hot Food or Interactive?</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {categories.map((item) => {
              return (
                <CustomButton
                  key={item}
                  onPress={() => {
                    setFilterChosen(item);
                  }}
                  marginVertical={10}
                  marginHorizontal={2.8}
                  buttonColor={
                    item == filterChosen ? colors.wpurple : colors.white
                  }
                  height={40}
                  fontSize={13}
                  borderRadius={60}
                  textColor={
                    item == filterChosen ? colors.white : colors.wpurple
                  }
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
        </View>
        {/*NEXTTTTTTTTTTTTT*/}

        <View
          style={{
            width: dimensions.width,
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={styles.subtitle}>Restrictions:</Text>
        </View>

        {/*NEXTTTTTTTTTTTTT*/}
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
                  setMap(new Map<string, boolean>([...map, [item, newValue]]));
                }}
                marginVertical={5}
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <CustomButton
            onPress={() => {}}
            borderRadius={16}
            buttonColor={colors.wpurple}
            fontSize={20}
            height={60}
          >
            Set Food Item
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
  subtitle: {
    color: colors.black,
    fontFamily: "inter",
    fontSize: 20,
    fontWeight: "semibold",
  },
});
