import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import colors from "@/constants/Colors";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import TextField from "@/components/TextField";
import FoodBox from "@/components/FoodBox";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Dialog } from "react-native-simple-dialogs";
import * as FileSystem from "expo-file-system";

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
  const [image, setImage] = useState("");
  const [dialog, setDialog] = useState(false);
  const allergyList = ["Meat", "Gluten", "Pork", "Dairy", "Seafood", "Nuts"];
  const [foodName, setFoodName] = useState("");

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets![0].uri);
        setDialog(false);
      }
    } catch (error) {
      setDialog(false);
      alert("Error Uploading Image");
    }
  };

  const takeImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result);
        setImage(result.assets![0].uri);
        setDialog(false);
      }
    } catch (error) {
      setDialog(false);
      alert("Error Uploading Image");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Dialog
            visible={dialog}
            title="Choose Photo Upload Method"
            titleStyle={styles.dialog}
            onTouchOutside={() => {
              setDialog(false);
            }}
            onRequestClose={() => {}}
            contentInsetAdjustmentBehavior={undefined}
            animationType="fade"
            dialogStyle={{ borderRadius: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => uploadImage()}
                style={{ alignItems: "center" }}
              >
                <EvilIcons name="image" size={70} color={colors.black} />
                <Text style={{ fontSize: 30 }}>Media</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takeImage()}
                style={{
                  alignItems: "center",
                  marginLeft: "20%",
                }}
              >
                <Feather name="camera" size={50} color={colors.black} />
                <Text style={{ fontSize: 30, marginTop: 3 }}>Camera</Text>
              </TouchableOpacity>
            </View>
          </Dialog>
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
                source={image}
                onPress={() => {}}
                name={foodName}
                rating={0}
                fontSize={12}
                width={dimensions.width * 0.29}
                minWidth={113.1}
              />
            </View>
          </View>
          <View
            style={{
              width: dimensions.width,

              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 15,
                alignItems: "center",

                width: dimensions.width * 0.5,
              }}
              onPress={() => setDialog(true)}
            >
              <Text style={[styles.subtitle, { color: "blue" }]}>
                Change Image
              </Text>
            </TouchableOpacity>
          </View>

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
                    setMap(
                      new Map<string, boolean>([...map, [item, newValue]])
                    );
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
              onPress={async () => {
                try {
                  // const base64 = await FileSystem.readAsStringAsync(image, {
                  //   encoding: FileSystem.EncodingType.Base64,
                  // });
                  // //data:image/jpeg;base64,
                  // let another = await axios.post(
                  //   "https://0933-2607-fea8-335e-e800-456d-8f3b-fca2-b5a8.ngrok-free.app/foods/",
                  //   {
                  //     name: "ArshamFam",
                  //     image: "data:image/jpeg;base64," + base64,
                  //     ingredients: [],
                  //     allergies: ["Shriraam"],
                  //     type: "Hot Food",
                  //   }
                  // );
                  let response = await axios.get(
                    "https://0933-2607-fea8-335e-e800-456d-8f3b-fca2-b5a8.ngrok-free.app/foods/ArshamFam"
                  );
                  console.log(response.data.name);
                  setImage(response.data.image);
                } catch (error) {
                  console.log(error);
                }
              }}
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
    </TouchableWithoutFeedback>
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
  dialog: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 5,
  },
});
