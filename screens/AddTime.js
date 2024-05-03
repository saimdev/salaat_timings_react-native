import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
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

const AddTime = () => {
  const navigation = useNavigation();

  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
 

  const toggleTimePicker = (picker) => {
    switch (picker) {
      case "time":
        setShowTimePicker(!showTimePicker);
        break;
      case "date":
        setShowDatePicker(!showDatePicker);
        break;
      default:
        break;
    }
  };

  const handleTimeChange = (event, selectedTime, prayerName) => {
    const currentTime = selectedTime || new Date();
    const currentDate = selectedTime || new Date();
    switch (prayerName) {
      case "time":
        setTime(currentTime);
        setShowTimePicker(false);
        break;
      case "date":
        setDate(currentDate);
        setShowDatePicker(false);
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
            <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
              <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 25 }}>Time and Date</Text>
            </View>
            {/* <View>
              <Text>Name of Mosque</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                editable={false}
                value={"Jamia Masjid"}
              />
            </View> */}
            <View>
              <Text>Time</Text>
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={time}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "time")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("time")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {time.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Date</Text>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  value={date}
                  display="default"
                  style={{ zIndex: 10 }}
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "date")
                  }
                />
              )}
              <TouchableOpacity onPress={() => toggleTimePicker("date")}>
                <Text style={[styles.input, { textAlignVertical: "center" }]}>
                  {date.toLocaleDateString()} {/* Call toLocaleDateString as a function */}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                style={styles.btnTouch}
                activeOpacity={0.8}
                onPress={() => {
                  // Add functionality to add mosque
                  console.log("Add mosque button pressed");
                }}
              >
                <Text style={styles.btnText}>SET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTime;

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
    marginTop: "2%",
    marginBottom: '3%',
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
