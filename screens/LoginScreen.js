import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,

} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SignupScreen from "./SignupScreen";
import { useFocusEffect } from "@react-navigation/native";
// Images
import logo from "../assets/images/logo.png";

const LoginScreen = () => {

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setMasjid("");
        setPassword("");
      };
    }, [])
  );
  const navigation = useNavigation();

  const [masjid, setMasjid] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://192.168.100.72:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        masjid,
        password,
      }),
    });

    const data = await res.json();
    if (data.message) {
      Alert.alert("Successfull", "LoggedIn Successfully");
      // AsyncStorage.setItem('masjid', masjid);
      console.log(data.userData);
      const userData = {
        id:data.userData._id,
        masjid:masjid
      }
      const userDataString  = JSON.stringify(userData);
      AsyncStorage.setItem("userID", userDataString);
      navigation.navigate("AddTime");
    } else if (data.error) {
      Alert.alert("Error", data.error);
      return;
    } else {
      Alert.alert("Error", "Error while signing in");
      return;
    }
    // }
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ height: hp("100%") }}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <View style={{ alignItems: "center", paddingTop: "0%" }}>
            <Image source={logo} />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ marginTop: "20%" }}>
              <Text
                style={{ fontWeight: "bold", textAlign: "left", fontSize: 25 }}
              >
                Sign in your account
              </Text>
            </View>
            <View style={{ marginTop: "5%" }}>
              <Text style={{ color: "#000", fontSize: 18 }}>Masjid Name</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Faisal Masjixd"
                value={masjid}
                onChangeText={setMasjid}
              />
            </View>
            <View style={{ marginTop: "5%" }}>
              <Text style={{ color: "#000", fontSize: 18 }}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={{ marginTop: "10%" }}>
              <TouchableOpacity
                style={styles.btnTouch}
                activeOpacity={0.8}
                onPress={login}
              >
                <Text style={styles.btnText}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888888",
                  }}
                >
                  Don't have an account?{" "}
                  <Text
                    style={{ color: "#00B140" }}
                    onPress={() => {
                      navigation.navigate(SignupScreen);
                    }}
                  >
                    SIGN UP
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    height: hp("100%"),
  },
  input: {
    height: hp("6%"),
    backgroundColor: "#FAFAFA",
    marginTop: "5%",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  btnTouch: {
    paddingVertical: 15,
    backgroundColor: "#00B140",
    borderRadius: 10,
  },
  btnGoogle: {
    backgroundColor: "#F4F4F4",
    width: wp("20%"),
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});
