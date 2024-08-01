import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { ABeeZee_400Regular } from "@expo-google-fonts/aBeeZee";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import colors from "../../constants/Colors";
import CustomButton from "@/components/CustomButton";

export default function OnBoarding() {
  return (
    <ImageBackground
      source={require("../../assets/images/splash_background.jpg")}
      style={styles.bg}
    >
      <View style={{ flex: 0.8 }}>
        <Text style={styles.title}>AppName</Text>
        <Text style={styles.subtitle}>Home of Western {"\n"}Dining</Text>
      </View>
      <View style={{ flex: 0.2 }}>
        <CustomButton
          borderRadius={16}
          onPress={() => router.push("/(tabs)/account")}
        >
          Login
        </CustomButton>
      </View>
    </ImageBackground>
  );
}

// export default OnBoarding;

const styles = StyleSheet.create({
  bg: {
    objectFit: "cover",
    flex: 1,
    opacity: 0.9,
  },
  title: {
    color: "white",
    marginTop: "25%",
    marginLeft: "10%",
    fontSize: 56,
    fontWeight: "500",
    fontFamily: "Inter_600SemiBold",
  },
  subtitle: {
    color: "white",
    fontSize: 32,
    marginLeft: "10%",
    marginTop: "2%",
    fontWeight: "semibold",
    fontFamily: "inter",
    fontStyle: "italic",
  },
});

// export default function OnBoarding() {
//   return (
//     <ImageBackground
//       source={require("../../assets/images/splash_background.jpg")}
//       style={styles.bg}
//     >
//       <View style={{ flex: 0.8 }}>
//         <Text style={styles.title}>AppName</Text>
//         <Text style={styles.subtitle}>Home of Western {"\n"}Dining</Text>
//       </View>
//       <View style={{ flex: 0.2 }}>
//         <Button
//           style={styles.button}
//           mode="contained"
//           buttonColor={colors.lpurple}
//           onPress={async () => {}}
//         >
//           <Text style={styles.buttonText}>Login</Text>
//         </Button>
//       </View>
//     </ImageBackground>
//   );
// }

// // export default OnBoarding;

// const styles = StyleSheet.create({
//   bg: {
//     objectFit: "cover",
//     flex: 1,
//     opacity: 0.9,
//   },
//   title: {
//     color: "white",
//     marginTop: "25%",
//     marginLeft: "10%",
//     fontSize: 56,
//     fontWeight: "500",
//     fontFamily: "Inter_600SemiBold",
//   },
//   subtitle: {
//     color: "white",
//     fontSize: 32,
//     marginLeft: "10%",
//     marginTop: "2%",
//     fontWeight: "semibold",
//     fontFamily: "inter",
//     fontStyle: "italic",
//   },
//   button: {
//     justifyContent: "center",
//     height: 60,
//     marginHorizontal: "10%",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 20,
//     fontFamily: "ABeeZee_400Regular",
//     fontWeight: "bold",
//   },
// });
