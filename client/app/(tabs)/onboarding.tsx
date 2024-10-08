import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function OnBoarding() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/splash_background.jpg")}
      style={styles.bg}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 0.85 }}>
          <Text style={styles.title}>CafIt!</Text>
          <Text style={styles.subtitle}>Home of Western {"\n"}Dining</Text>
        </View>
        <View style={{ flex: 0.15 }}>
          <CustomButton
            borderRadius={16}
            onPress={() => {
              router.replace("/(tabs)/login");
            }}
          >
            Login
          </CustomButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    objectFit: "cover",
    flex: 1,
    opacity: 0.9,
  },
  title: {
    color: "white",
    marginTop: "15%",
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
