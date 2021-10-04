//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';
import images from './app/config/images';


import ListingDetailsScreen from './app/screens/ListingDetails.Screen';
import ListingEditScreen from './app/screens/ListingEdit.Screen';
import MessagesScreen from './app/screens/Messages.Screen';
//import "react-native-gesture-handler"


export default function App() {

  return (
    <View style={styles.container}>
        <ListingEditScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
