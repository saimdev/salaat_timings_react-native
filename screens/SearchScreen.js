import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchScreen = () => {
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20, marginVertical: 5 }}>
        <TextInput style={styles.input} placeholder="Search" />
      </View>
      <ScrollView
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <View style={styles.container}>
          <View>
            <Text style={{paddingHorizontal:15, color:'#9B9A9A'}}>Search Results...</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
          <View style={styles.searchTile}>
            <Text>Masjid Name</Text>
            <Text>Masjid Location</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 50,
    backgroundColor: "white",
  },
  input: {
    height: hp("6%"),
    backgroundColor: "#FAFAFA",
    marginTop: "5%",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchTile:{
    display:'flex',
    flexDirection:'row',
    textAlignVertical:'center',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:15,
    borderRadius:10,
    height:hp('8%'),
    backgroundColor:'#E6B941',
    marginVertical:5
  }
});
