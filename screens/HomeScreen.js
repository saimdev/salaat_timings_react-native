import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [loader, setLoader] = useState(true);
  const [prayerTimings, setPrayerTimings] = useState([]);
  const [hijri, setHijri] = useState("");
  const [nearby, setNearBy] = useState([]);
const [distances, setDistances] = useState([]);
  
  useEffect(()=>{
    getLocation();
  },[])


  const getLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      try {
        console.log("Check");
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        // const locationToAdd = { latitude: latitude, longitude: longitude };
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        // AsyncStorage.setItem("location", JSON.stringify(locationToAdd));
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const res = await fetch(
          `http://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const data = await res.json();
        setPrayerTimings(data.data.timings);
        setHijri(data.data.date.hijri);
        console.log(data);
        const lat1 = 40.7128; // Latitude of point 1
        const lon1 = -74.006; // Longitude of point 1
        const lat2 = 34.0522; // Latitude of point 2
        const lon2 = -118.2437; // Longitude of point 2

        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        console.log(distance);
        getNearbY(latitude, longitude);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }

      function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371; // Radius of the Earth in kilometers
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c;
        return distance;
      }

      async function getNearbY(latitude, longitude) {
        const res = await fetch("http://192.168.100.72:5000/get_all_mosques");
        const data = await res.json();
        console.log(data);
        const nearBy = data.filter((mosque) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            mosque.latitude,
            mosque.longitude
          );
           if(distance<1){
            mosque.distance = distance.toFixed(2);
            return true
           }
          return false;
        });

        setNearBy(nearBy);
      }
      // AsyncStorage.setItem("Longitude", longitude);
    }
  };
  // const getValueFromStorage = async () => {
  //   try {
  //     const locationToAdd = await AsyncStorage.getItem("location");
  //     // const Longitude = await AsyncStorage.getItem('Longitude');
  //     if (locationToAdd !== null) {
  //       console.log("location got:", locationToAdd);

  //       const currentDate = new Date();
  //       const day = currentDate.getDate();
  //       const month = currentDate.getMonth() + 1;
  //       const year = currentDate.getFullYear();

  //       // Output the current date in a readable format
  //       console.log(`Current date: ${year}-${month}-${day}`);
  //       // console.log('latitude', Latitude)
  //     } else {
  //       console.log("location not found in AsyncStorage");
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving data from AsyncStorage:", error);
  //   }
  // };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.main}>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Welcome, Salaaat Tracker
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "400", fontStyle: "italic" }}
              >
                {hijri.date}
              </Text>
            </View>
            {prayerTimings && (
              <View style={styles.tileContainer}>
                {Object.keys(prayerTimings).map((prayer, index) => (
                  <View key={index} style={styles.tiles}>
                    <Text style={styles.prayerName}>{prayer}</Text>
                    <Text style={styles.prayerTime}>
                      {prayerTimings[prayer]}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Nearby</Text>
          </View>
          <View style={styles.Nearby}>
            {nearby.map((mosque, index) => (
              <View key={mosque._id} style={styles.nearbyTiles}>
                <Text style={styles.neabyText}>{mosque.masjid}</Text>
                <Text style={{color:'white', fontStyle:'italic'}}>{mosque.distance} Km away</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // height: hp("100%"),
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginBottom: 50,
    backgroundColor: "white",
    // flex: 1,
  },
  input: {
    height: hp("6%"),
    backgroundColor: "#FAFAFA",
    marginTop: "5%",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  main: {
    display: "flex",
  },
  tileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  tiles: {
    paddingVertical: 20,
    // paddingHorizontal: 60,
    backgroundColor: "#85DBA4",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    width: 150,
  },
  prayerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  prayerTime: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "600",
  },
  nearbyTiles: {
    fontSize: 16,
    backgroundColor: "#00B140",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
  neabyText: {
    color: "white",
    fontSize:17,
    fontWeight:'bold'
  },
});
