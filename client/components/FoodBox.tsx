import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function FoodBox(props: any) {
  const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginLeft: props.marginLeft ?? "2.2%",
        marginTop: props.marginTop ?? "2.2%",
      }}
    >
      <View
        style={{
          shadowColor: colors.gray,
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1,
          shadowRadius: 2,
          flexDirection: "column",
          borderRadius: 12,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={
              props.source == "" || !props.source
                ? require("@/assets/images/image_not_found.png")
                : { uri: props.source }
            }
            style={{
              backgroundColor: colors.gray,
              width: props.width,
              height: props.width,
              minHeight: props.minWidth,
              minWidth: props.minWidth,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}
          ></Image>
          {props.selected && (
            <>
              <View
                style={{
                  width: props.width,
                  height: props.width,
                  minHeight: props.minWidth,
                  minWidth: props.minWidth,
                  position: "absolute",
                  backgroundColor: colors.black,
                  opacity: 0.3,
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                }}
              ></View>
              <Feather
                name="check"
                size={45}
                style={{ position: "absolute" }}
                color={colors.black}
              ></Feather>
            </>
          )}
        </View>
        <View
          style={{
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
            paddingLeft: 4.5,
            paddingVertical: 6,
            marginRight: 2,
            backgroundColor: colors.white,
            width: props.width,
            minWidth: props.minWidth,
            flexDirection: "row",
            height: props.height ?? dimensions.width * 0.115,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.75, paddingRight: 1 }}>
            <Text
              style={{
                fontFamily: "inter",
                fontWeight: "500",
                fontSize: props.fontSize,
                letterSpacing: -0.8,
              }}
              numberOfLines={2}
            >
              {props.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              marginRight: 6,
              flex: 0.25,
            }}
          >
            <Ionicons
              color={colors.yellow}
              name="star"
              size={props.starSize ?? 12}
              onPress={() => {}}
            />
            <Text
              style={{
                fontSize: props.ratingFont ?? 10.5,
                marginLeft: 1,
                fontWeight: "medium",
              }}
            >
              {props.rating > 5 || props.rating < 0 || !props.rating
                ? "NA"
                : props.rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
      {props.onDelete && (
        <Ionicons
          name="close-circle"
          size={40}
          color={colors.wpurple}
          onPress={props.onDelete}
          style={{ position: "absolute", right: 5, top: 5 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
