import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { MultiSelect } from "react-native-element-dropdown";
import { RootState } from "../state/store"; // adjust the import to your actual path
import { add, rid } from "../state/residence/resSlice"; // adjust the import to your actual path
// adjust the import to your actual path

interface ItemType {
  label: string;
  value: string; // changed to string to match data
}

const MultiSelectComponent = () => {
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
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={10} />
      </View>
    );
  };

  return (
    <MultiSelect
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      confirmUnSelectItem={true}
      search={false}
      onChange={(item) => {
        dispatch(add(item));
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={renderItem}
      renderSelectedItem={(item: ItemType) =>
        resList.resList.includes(item.value) ? (
          <View style={styles.selectedStyle}>
            <Text style={styles.textSelectedStyle}>{item.label}</Text>
            <TouchableOpacity onPress={() => dispatch(rid(item.value))}>
              <>
                <AntDesign color="black" name="delete" size={17} />
              </>
            </TouchableOpacity>
          </View>
        ) : (
          <Text></Text>
        )
      }
      maxHeight={130}
    />
  );
};

export default MultiSelectComponent;

// import React, { useState } from "react";
// import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import { MultiSelect } from "react-native-element-dropdown";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/state/store";
// import { add, rid } from "@/state/residence/resSlice";

// const MultiSelectComponent = () => {
//   const resList = useSelector((state: RootState) => state.resList);
//   const dispatch = useDispatch();
//   type itemType = { label: string; value: string };

//   const data = [
//     { label: "Ontario Hall", value: "Ontario Hall" },
//     { label: "Saugeen Hall", value: "Saugeen Hall" },
//     { label: "Sydenham Hall", value: "Sydenham Hall" },
//     { label: "Delaware Hall", value: "Delaware Hall" },
//     { label: "Perth Hall", value: "Perth Hall" },
//     { label: "Elgin Hall", value: "Elgin Hall" },
//     { label: "Essex Hall", value: "Essex Hall" },
//   ];

//   const renderItem = (item: itemType) => {
//     return (
//       <View style={styles.item}>
//         <Text style={styles.selectedTextStyle}>{item.label}</Text>
//         <AntDesign style={styles.icon} color="black" name="Safety" size={10} />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <MultiSelect
//         style={styles.dropdown}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         labelField="label"
//         valueField="value"
//         placeholder="Select item"
//         confirmUnSelectItem={true}
//         search={false}
//         onChange={(item : itemType) => {
//           dispatch(add(item.value));
//         }}
//         renderLeftIcon={() => (
//           <AntDesign
//             style={styles.icon}
//             color="black"
//             name="Safety"
//             size={20}
//           />
//         )}
//         // renderItem={renderItem}
//         renderSelectedItem={(item) =>
//           resList.resList.includes(item.label) ? (
//             <View style={styles.selectedStyle}>
//               <Text style={styles.textSelectedStyle}>{item.label}</Text>
//               <TouchableOpacity onPress={() => dispatch(rid(item.label))}>
//                 <>
//                   <AntDesign color="black" name="delete" size={17} />
//                 </>
//               </TouchableOpacity>
//             </View>
//           ) : null
//         }
//         maxHeight={130}
//       />
//     </View>
//   );
// };

// export default MultiSelectComponent;

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
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
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
    marginRight: 5,
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
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
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
    marginRight: 5,
    fontSize: 16,
  },
});
