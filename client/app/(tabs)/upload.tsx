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
  Alert,
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
import { useDispatch } from "react-redux";
import { add } from "@/state/presets/presetSlice";

export default function UploadScreen() {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
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
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>(
    undefined
  );
  const [dialog, setDialog] = useState(false);
  const allergyList = ["Meat", "Gluten", "Pork", "Dairy", "Seafood", "Nuts"];
  const [foodName, setFoodName] = useState("");

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        setImage(result.assets![0]);
        setDialog(false);
      }
    } catch (error) {
      console.log(error);
      setDialog(false);
      Alert.alert(`Error Uploading Image`, undefined, [
        {
          text: "Ok",
          onPress: () => {},
        },
      ]);
    }
  };

  const takeImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
      });

      if (!result.canceled) {
        console.log(result);
        setImage(result.assets![0]);
        setDialog(false);
      }
    } catch (error) {
      console.log(error);
      setDialog(false);
      Alert.alert(`Error Uploading Image`, undefined, [
        {
          text: "Ok",
          onPress: () => {},
        },
      ]);
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
                source={image?.uri}
                upload={true}
                onPress={() => console.log(image)}
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
                if (!foodName || !filterChosen || !image) {
                  Alert.alert(
                    `Please Make Sure Image, Item Name, And Item Category Are Filled In`,
                    undefined,
                    [
                      {
                        text: "Ok",
                        onPress: () => {},
                      },
                    ]
                  );
                } else {
                  Alert.alert(
                    `Are You Sure You Want To Upload This Item?`,
                    undefined,
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "Upload",
                        onPress: async () => {
                          let restrictions: string[] = [];
                          map.forEach((value, key) => {
                            if (value) restrictions.push(key);
                          });
                          try {
                            const response = await FileSystem.uploadAsync(
                              `http://10.0.0.136:3000/foods/tempRoute`,
                              image.uri,
                              {
                                headers: {
                                  mimeType: image.mimeType!,
                                },
                                fieldName: "file",
                                httpMethod: "PATCH",
                                uploadType:
                                  FileSystem.FileSystemUploadType
                                    .BINARY_CONTENT,
                                mimeType: image.mimeType,
                              }
                            );

                            let another = await axios.post(
                              "http://10.0.0.136:3000/foods/",
                              {
                                name: foodName,
                                image: response.body,
                                allergies: restrictions,
                                type: filterChosen,
                              }
                            );

                            Alert.alert("Item Created", undefined, [
                              {
                                text: "Ok",
                                onPress: () => {
                                  dispatch(add(another.data));
                                  router.back();
                                },
                              },
                            ]);
                          } catch (error) {
                            Alert.alert(
                              "Something Went Wrong",
                              "Please Check Your Connection and Try Again",
                              [
                                {
                                  text: "Ok",
                                  onPress: () => {},
                                },
                              ]
                            );
                          }
                        },
                      },
                    ]
                  );
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
