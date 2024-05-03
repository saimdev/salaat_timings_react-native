import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

// Images
import logo from "../assets/images/logo.png";
import google from "../assets/images/google.png";
import facebook from "../assets/images/facebook.png";
import twitter from "../assets/images/twitter.png";
import { useNavigation } from "@react-navigation/native";
import MapScreen from "./MapScreen";
import { useFocusEffect } from "@react-navigation/native";

const SignupScreen = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);
  const [username, setUsername] = useState("");
  const [masjid, setMasjid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  // const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setUsername("");
        setMasjid("");
        setPassword("");
        setConfirmPassword("");
        setLongitude(null);
        setLatitude(null);
      };
    }, [])
  );


  const register = async () => {
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      Alert.alert("Error", "Password not matched");
      return;
    } else {
      const res = await fetch("http://192.168.100.72:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: username,
          masjid,
          password,
          longitude, 
          latitude
        }),
      });

      const data = await res.json();
      if (data.message) {
        Alert.alert("Successfull", "Registered Successfully");
        navigation.navigate("Login");
      } else if (data.error) {
        Alert.alert("Error", data.error);
        return;
      } else {
        Alert.alert("Error", "Error while registering");
        return;
      }
    }
  };

  const fetchLocation = () =>{
    setSelection(true);
  }

  const handleLocationChange = (latitude, longitude) => {
    console.log("Latitude:", (typeof latitude));
    setLatitude(latitude);
    setLongitude(longitude);
    console.log("Longitude:", longitude);
    setSelection(false);
    // Do something with the latitude and longitude, e.g., send it to server
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
        {
          longitude || !isSelected?
          <View style={styles.main}>
          <ScrollView>
            <View style={{ alignItems: "center", paddingTop: "5%" }}>
              <Image source={logo} />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ marginTop: "20%" }}>
                <Text
                  style={{ fontWeight: "bold", textAlign: "left", fontSize: 25 }}
                >
                  Create your account
                </Text>
              </View>
              <View style={{ marginTop: "5%" }}>
                <Text style={{ color: "#000", fontSize: 18 }}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ex: jon smith"
                  keyboardType="email-address"
                  inputMode="text"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={{ marginTop: "5%" }}>
                <Text style={{ color: "#000", fontSize: 18 }}>Masjid Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Masjid name"
                  // keyboardType="email-address"
                  // inputMode="email"
                  value={masjid}
                  onChangeText={setMasjid}
                />
              </View>
              <View style={{ marginTop: "5%" }}>
                <Text style={{ color: "#000", fontSize: 18 }}>Location</Text>
  
                <TouchableOpacity style={[styles.input, {alignItems:'center', justifyContent:'center'}]} onPress={fetchLocation} >
                  <Text style={{color:"#00B140"}}>{longitude? `Lat: ${latitude}, Long: ${longitude}`: "Select Location of Masjid"}</Text>
                </TouchableOpacity>
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
              <View style={{ marginTop: "5%" }}>
                <Text style={{ color: "#000", fontSize: 18 }}>
                  Confirm Password
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confrim Password"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <View style={{ marginTop: "0%" }}>
                {/* <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                /> */}
              </View>
              <View style={{ marginTop: "5%" }}>
                <TouchableOpacity
                  style={styles.btnTouch}
                  activeOpacity={0.8}
                  onPress={register}
                >
                  <Text style={styles.btnText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
  
              <View
                style={{
                  marginTop: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity activeOpacity={0.8} style={{marginBottom:8}}>
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
                        navigation.navigate("Login");
                      }}
                    >
                      SIGN IN
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </ScrollView>
          </View>:
          <MapScreen onLocationSelect={handleLocationChange}/>
        }
      
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignContent: "end",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    // height: hp("100%"),
    // borderWidth: 1,
    // borderColor: "red",
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
