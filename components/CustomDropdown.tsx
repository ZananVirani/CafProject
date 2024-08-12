import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MultiSelect } from "react-native-element-dropdown";
import { RootState } from "../state/store";
import { add, rid } from "../state/residence/resSlice";
import Colors from "@/constants/Colors";

interface ItemType {
  label: string;
  value: string;
}

const MultiSelectComponent = (props: any) => {
  const resList = useSelector((state: RootState) => state.resList);
  const dispatch = useDispatch();

  const data: ItemType[] = [
    { label: "Ontario Hall", value: "Ontario Hall" },
    { label: "Saugeen Hall", value: "Saugeen Hall" },
    { label: "Sydenham Hall", value: "Sydenham Hall" },
    { label: "Delaware Hall", value: "Delaware Hall" },
    { label: "Perth Hall", value: "Perth Hall" },
    { label: "Elgin Hall", value: "Elgin Hall" },
    { label: "Essex Hall", value: "Essex Hall" },
  ];

  const renderItem = (item: ItemType) => {
    return (
      <View style={styles.item}>
        <AntDesign style={styles.icon} color="black" name="home" size={15} />
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <View style={{ marginRight: -4, flex: 0.1 }}>
          {resList.resList.includes(item.value) && (
            <AntDesign
              style={[styles.icon, { marginRight: -4 }]}
              color="black"
              name="check"
              size={15}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: "8%" }}>
      <MultiSelect
        dropdownPosition="auto"
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Most visited cafeterias..."
        search={false}
        onChange={(item) => {
          props.setThirdError(false);
          resList.resList.includes(item[0])
            ? dispatch(rid(item[0]))
            : dispatch(add(item));
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color="black"
            name="fast-food-outline"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item: ItemType) =>
          resList.resList.includes(item.value) ? (
            <View style={styles.selectedStyle}>
              <View style={{ flex: 0.82, paddingRight: 3 }}>
                <Text style={styles.textSelectedStyle} numberOfLines={1}>
                  {item.label}
                </Text>
              </View>
              <TouchableOpacity
                style={{ flex: 0.18 }}
                onPress={() => dispatch(rid(item.value))}
              >
                <View>
                  <AntDesign color="black" name="delete" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <Text></Text>
          )
        }
        maxHeight={130}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginTop: 10,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    flex: 0.8,
    fontSize: 14,
    fontFamily: "inter",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    flex: 0.1,
    marginRight: 10,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 12,
    width: "31%",
    marginHorizontal: 3,
    paddingHorizontal: 5,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginLeft: 3,
    fontSize: 13,
  },
});
