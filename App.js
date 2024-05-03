import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo vector icons
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutScreen from "./screens/LogoutScreen";
// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import NamazTime from "./screens/NamazTime";
import MapScreen from "./screens/MapScreen";
import AddTime from "./screens/AddTime";
import SettingScreen from "./screens/SettingScreen";
import SearchScreen from "./screens/SearchScreen";
import * as Location from "expo-location";
import Bluetooth from "./screens/Bluetooth";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

// Tabs
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [ masjid, setMasjid] = useState("");
  useEffect(() => {
    getLocationPermission();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       getLocationPermission();
  //     };
  //   }, [])
  // );
  

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "This app needs access to your location to function properly.",
        [{ text: "OK", onPress: () => getLocationPermission() }]
      );
    } 

    const userIdString = await AsyncStorage.getItem("userID");
      console.log("CHECK", userIdString);

      if (userIdString) {
        const userId = JSON.parse(userIdString);
        const { id, masjid } = userId;
        if (masjid !== null) {
          console.log("Masjid got:", masjid);
          setMasjid(masjid);
          // setUserId(id);
          // const res = await fetch("http://192.168.100.72/getTimings");
        } else {
          console.log("Masjid not found in AsyncStorage");
        }
      } else {
        console.log("User ID not found in AsyncStorage");
      }
    // masjid&&
    
  };

  
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Bluetooth"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Namaz") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "AddTime") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Login") {
              iconName = focused ? "log-in" : "log-in-outline";
            } else if (route.name === "Signup") {
              iconName = focused ? "person-add" : "person-add-outline";
            }
            else if (route.name === "Logout") {
              iconName = focused ? "log-out" : "log-out-outline";
            }
           
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#00B140",
          inactiveTintColor: "gray",
        }}
      >
        
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Namaz"
          component={NamazTime}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        /> */}
       
        <Tab.Screen
          name="AddTime"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen
          name="Setting"
          component={AddTime}
          options={{ headerShown: false }}
        /> */}
       <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ headerShown: false }}
      />
        
         {/* <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />  */}
        <Tab.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Tab.Screen
          name="Bluetooth"
          component={Bluetooth}
          options={{
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
