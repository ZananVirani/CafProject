import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { format } from "date-fns";
import TextField from "@/components/TextField";
import PresetButton from "@/components/PresetButton";

export default function Menu() {
  const dimensions = useWindowDimensions();
  const [selectMode, setSelectMode] = useState(false);
  const smth = format(new Date(), "yyyy/MM/dd");
  const allPresets = [
    "Hello",
    "ThanksGiving",
    "Easter/Hannukah",
    "Easter/Hannukahuffr",
    "Christmas",
    "Monday",
    "Hello",
    "ThanksGiving",
    "Easter/Hannukah",
    "Easter/Hannukahuffr",
    "Christmas",
    "Monday",
  ];
  const [presets, setPresets] = useState(allPresets);
  const [searchText, setSearchText] = useState("");
  const [deletedPresets, setDeletedPresets] = useState(new Set());

  useEffect(() => {
    setPresets(
      allPresets.filter((item) => {
        return item.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
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
            <Text style={styles.title}>Menu Upload</Text>
          </View>
        </View>
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "10%",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <View style={{ width: "50%", flexDirection: "row" }}>
            <CustomButton
              onPress={() => {
                setSelectMode(!selectMode);
              }}
              marginVertical={0}
              marginHorizontal={3}
              buttonColor={selectMode ? colors.wpurple : colors.white}
              height={40}
              fontSize={15}
              borderRadius={60}
              textColor={selectMode ? colors.white : colors.wpurple}
              borderColor={colors.wpurple}
              fontFamily="inter"
              fontWeight="medium"
              lSpacing={undefined}
            >
              {selectMode ? "Unselect" : "Select"}
            </CustomButton>

            {selectMode && (
              <>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: colors.black,
                    borderWidth: 1,
                    borderRadius: 50,
                    height: 40,
                    width: 40,
                    marginLeft: 5,
                  }}
                >
                  <AntDesign color="black" name="delete" size={22} style={{}} />
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={{ width: "40%" }}>
            <Text
              style={{
                textAlign: "right",
                fontSize: 16,
                fontFamily: "inter",
              }}
              adjustsFontSizeToFit={true}
            >
              {smth}
              {"\n"}Sydenham Hall
            </Text>
          </View>
        </View>
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}
        {/*NEXTTTTTTTTTTTTTTTT*/}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
            marginTop: "5%",
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                width: dimensions.width * 0.4,
                height: dimensions.width * 0.3,
                backgroundColor: colors.wpurple,
                borderTopRightRadius: 14,
                borderTopLeftRadius: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="plus"
                color={colors.verylightgray}
                size={60}
              ></AntDesign>
            </View>
            <View
              style={{
                width: dimensions.width * 0.4,
                height: dimensions.width * 0.1,
                borderBottomRightRadius: 14,
                borderBottomLeftRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.verylightgray,
                borderWidth: 1,
                borderColor: colors.gray,
              }}
            >
              <Text style={{ fontStyle: "italic", fontFamily: "inter" }}>
                Create New Menu
              </Text>
            </View>
          </TouchableOpacity>
          {/*NEXTTTTTTTTTTTTTTTT*/}
          {/*NEXTTTTTTTTTTTTTTTT*/}
          {/*NEXTTTTTTTTTTTTTTTT*/}
          {/*NEXTTTTTTTTTTTTTTTT*/}

          <View
            style={{
              width: "100%",
              marginVertical: "5%",
              justifyContent: "center",
            }}
          >
            <TextField
              placeText={"Search From Presets..."}
              onChangeText={(text: any) => {
                setSearchText(text);
              }}
              style={{ paddingRight: 40 }}
            ></TextField>
            <AntDesign
              name="search1"
              color={colors.gray}
              size={25}
              style={{
                position: "absolute",
                right: 0,
                marginRight: dimensions.width * 0.1 + 25,
              }}
            />
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: dimensions.width * 0.8,
              }}
            >
              {presets.map((item, index) => {
                return (
                  <PresetButton
                    key={index}
                    text={item}
                    index={index}
                    selected={
                      selectMode && deletedPresets.has(item) ? true : false
                    }
                    onPress={() => {
                      selectMode ? toggleSelect(item) : visitPreset(item);
                    }}
                  />
                );
              })}
            </View>
            <View style={{ height: 270 }}></View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );

  function toggleSelect(item: string) {
    let tempPresets = new Set(deletedPresets);
    tempPresets.has(item) ? tempPresets.delete(item) : tempPresets.add(item);

    setDeletedPresets(tempPresets);
  }

  function visitPreset(item: string) {}
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
