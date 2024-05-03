import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
  import React, { useEffect } from "react";
  import { useFocusEffect } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

  
  const LogoutScreen = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        remove();
    },[]);
    useFocusEffect(
        React.useCallback(() => {
          return () => {
            remove();
          };
        }, [])
      );
    const remove = async ()=>{
        await AsyncStorage.removeItem("masjid");
        await AsyncStorage.removeItem("userId");
        navigation.navigate("Signup")
    }
    return (
      <View></View>
    );
  };
  
  export default LogoutScreen;

  