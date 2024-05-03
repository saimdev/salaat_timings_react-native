import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NamazTime = () => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [masjidName, setMasjidName] = useState("");
  const [userId, setUserId] = useState("");
  const [timingData, setTimings] = useState([]);

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setDay(day);
    setDate(month);
    setYear(year);
    const userIdString = await AsyncStorage.getItem("userID");
    console.log("CHECK", userIdString);
    const userId = JSON.parse(userIdString);
    const { id, masjid } = userId;
    if (userIdString) {
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

    const res = await fetch("http://192.168.100.72:5000/getTimings", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
    });

    const data = await res.json();
    console.log(data);
    setTimings(data.timingData);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.masjidName}>
            <View style={styles.masjidCon}>
              <Text
                style={{ fontSize: 22, fontWeight: "bold", color: "black" }}
              >
                {masjidName}
              </Text>
            </View>
            <View style={styles.masjidCon}>
              <Text style={{ fontSize: 14, fontWeight: "semibold" }}>
                {day}-{date}-{year}
              </Text>
            </View>
          </View>
          {/* <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", paddingVertical: 20 }}
            >
              Current Namaz Time
            </Text>
          </View>
          <View>
            <View style={styles.namazTimecurrent}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Fajar</Text>
              </View>
              <View>
                <Text>5:28</Text>
              </View>
            </View>
          </View> */}
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", paddingVertical: 20 }}
            >
              Namaz Timming
            </Text>
          </View>
          <ScrollView>
            {timingData && (
              <>
                <View style={styles.namazTimeJumma}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Jumma Prayer
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "white" }}>
                      {new Date(timingData.jumma).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
                {Object.keys(timingData).map((key) => {
                  if (
                    key !== "_id" &&
                    key !== "__v" &&
                    key !== "user" &&
                    key !== "jumma"
                  ) {
                    return (
                      <View key={key} style={styles.namazTime}>
                        <View>
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Text>
                        </View>
                        <View>
                          <Text>
                            {new Date(timingData[key]).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NamazTime;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  masjidCon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
  },
  masjidName: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#85DBA4",
    marginTop: 10,
    borderRadius: 10,
  },
  namazTime: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginVertical: 5,
  },
  namazTimeJumma: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#00B140",
    borderRadius: 10,
  },
  namazTimecurrent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#E6B941",
    borderRadius: 10,
  },
});
