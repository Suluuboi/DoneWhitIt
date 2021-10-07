//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';
import ImagePicker from './app/components/image/ImagePicker';
import GetMyLocation from './app/components/location/GetMyLocation';
import ListingEditScreen from './app/screens/ListingEdit.Screen';




export default function App() {

  

  return (
    <View style={styles.container}>
        <GetMyLocation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
