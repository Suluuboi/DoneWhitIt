//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';
import ImageFlatList from './app/components/image/ImageFlatList';
import ImageInput from './app/components/image/ImageInput';
import images from './app/config/images';


import ListingDetailsScreen from './app/screens/ListingDetails.Screen';
import ListingEditScreen from './app/screens/ListingEdit.Screen';
import MessagesScreen from './app/screens/Messages.Screen';
//import "react-native-gesture-handler"


export default function App() {

  return (
    <View style={styles.container}>
        <ImageFlatList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
