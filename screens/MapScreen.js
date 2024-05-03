import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({ onLocationSelect }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 33.7441911,
    longitude: 72.8705636,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("New Marker Coordinate:", { latitude, longitude }); // Log the coordinates
    setMarkers([{ latitude, longitude }]);
    Alert.alert(
      "Location",
      `Got location, latitude: ${latitude} - longitude: ${longitude}`,
      [
        {
          text: "OK",
          onPress: () => {
            onLocationSelect(latitude, longitude);
          },
        },
      ]
    );
  };
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
    useEffect(() => {
      userLocation();
    }, []);
  };

  return (
    // <SafeAreaView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton
          showsUserLocation
          region={mapRegion}
          onPress={handleMapPress}
        >
          {/* <Marker coordinate={mapRegion} title="Marker"/> */}
          {/* {markers.map((marker, index) => ( */}
            {
              markers &&console.log(markers[0])&&<Marker
          
              coordinate={markers[0]}
              title={`Marker`}
            />
            }
       
        </MapView>
      </View>
    // </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: wp("100%"),
    height: hp("100%"),
  },
});
