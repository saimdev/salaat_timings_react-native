import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Logo
import logo from "../assets/images/logo.png";

const SettingScreen = () => {
  const navigation = useNavigation();

  const [timeFajr, setFajrTime] = useState(new Date());
  const [timeZuhr, setZuhrTime] = useState(new Date());
  const [timeAsr, setAsrTime] = useState(new Date());
  const [timeMaghrib, setMaghribTime] = useState(new Date());
  const [timeIsha, setIshaTime] = useState(new Date());
  const [timeJummah, setJummahTime] = useState(new Date());
  const [masjidName, setMasjidName] = useState("");
  const [userId, setUserId] = useState("");

  const [showFajrPicker, setShowFajrPicker] = useState(false);
  const [showZuhrPicker, setShowZuhrPicker] = useState(false);
  const [showAsrPicker, setShowAsrPicker] = useState(false);
  const [showMaghribPicker, setShowMaghribPicker] = useState(false);
  const [showIshaPicker, setShowIshaPicker] = useState(false);
  const [showJummahPicker, setShowJummahPicker] = useState(false);

  useEffect(() => {
    getValueFromStorage();
  }, []);

  const getValueFromStorage = async () => {
    try {
      // const masjid = await AsyncStorage.getItem("masjid");
      const userIdString = await AsyncStorage.getItem("userID");
      console.log("CHECK", userIdString);

      if (userIdString) {
        const userId = JSON.parse(userIdString);
        const { id, masjid } = userId;
        if (masjid !== null) {
          console.log("Masjid got:", masjid);
          setMasjidName(masjid);
          setUserId(id);
          // const res = await fetch("http://192.168.100.72/getTimings");
        } else {
          console.log("Masjid not found in AsyncStorage");
        }
      } else {
        console.log("User ID not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  const toggleTimePicker = (picker) => {
    switch (picker) {
      case "fajr":
        setShowFajrPicker(!showFajrPicker);
        break;
      case "zuhr":
        setShowZuhrPicker(!showZuhrPicker);
        break;
      case "asr":
        setShowAsrPicker(!showAsrPicker);
        break;
      case "maghrib":
        setShowMaghribPicker(!showMaghribPicker);
        break;
      case "isha":
        setShowIshaPicker(!showIshaPicker);
        break;
      case "jummah":
        setShowJummahPicker(!showJummahPicker);
        break;
      default:
        break;
    }
  };

  const setTime = async () => {
    console.log(
      userId,
      timeFajr,
      timeAsr,
      timeZuhr,
      timeMaghrib,
      timeIsha,
      timeJummah
    );
    const res = await fetch("http://192.168.100.72:5000/setTimings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        timeFajr,
        timeAsr,
        timeZuhr,
        timeMaghrib,
        timeIsha,
        timeJummah,
      }),
    });

    const data = await res.json();
    if (data.message) {
      Alert.alert("Successfull", "Time updated Successfully");
      // AsyncStorage.setItem('masjid', masjid);
      // console.log(data.userData);
      // const userData = {
      //   id:data.userData._id,
      //   masjid:masjid
      // // }
      // const userDataString  = JSON.stringify(userData);
      // AsyncStorage.setItem("userID", userDataString);
      // navigation.navigate("AddTime");
    } else if (data.error) {
      Alert.alert("Error", data.error);
      return;
    } else {
      Alert.alert("Error", "Error while signing in");
      return;
    }
    // }
  };

  const handleTimeChange = (event, selectedTime, prayerName) => {
    const currentTime = selectedTime || new Date();
    switch (prayerName) {
      case "fajr":
        setFajrTime(currentTime);
        setShowFajrPicker(false);
        break;
      case "zuhr":
        setZuhrTime(currentTime);
        setShowZuhrPicker(false);
        break;
      case "asr":
        setAsrTime(currentTime);
        setShowAsrPicker(false);
        break;
      case "maghrib":
        setMaghribTime(currentTime);
        setShowMaghribPicker(false);
        break;
      case "isha":
        setIshaTime(currentTime);
        setShowIshaPicker(false);
        break;
      case "jummah":
        setJummahTime(currentTime);
        setShowJummahPicker(false);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image source={logo} />
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 25,
                }}
              >
                Namaaz Timming
              </Text>
            </View>
            <View>
              <Text>Name Of Mosque</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={masjidName}
                //
              />
            </View>
            <View>
              <Text>Fajr prayer time</Text>
              {showFajrPicker && (
                <DateTimePicker
                  mode="time"
                  value={timeFajr}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "fajr")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("fajr")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {timeFajr.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Zuhr prayer time</Text>
              {showZuhrPicker && (
                <DateTimePicker
                  mode="time"
                  value={timeZuhr}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "zuhr")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("zuhr")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {timeZuhr.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Asr prayer time</Text>
              {showAsrPicker && (
                <DateTimePicker
                  mode="time"
                  value={timeAsr}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "asr")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("asr")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {timeAsr.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Maghrib prayer time</Text>
              {showMaghribPicker && (
                <DateTimePicker
                  mode="time"
                  value={timeMaghrib}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "maghrib")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("maghrib")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {timeMaghrib.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Isha prayer time</Text>
              {showIshaPicker && (
                <DateTimePicker
                  mode="time"
                  value={timeIsha}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "isha")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("isha")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {timeIsha.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Jummah prayer time</Text>
              {showJummahPicker && (
                <DateTimePicker
                  mode="time"
                  value={timeJummah}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "jummah")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("jummah")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {timeJummah.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                style={styles.btnTouch}
                activeOpacity={0.8}
                onPress={setTime}
              >
                <Text style={styles.btnText}>Update Timings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp("100%"),
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 50,
    backgroundColor: "white",
  },
  input: {
    height: hp("6%"),
    backgroundColor: "#FAFAFA",
    marginBottom: "5%",
    marginTop: "1%",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  btnTouch: {
    paddingVertical: 15,
    backgroundColor: "#00B140",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});
