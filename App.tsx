//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';

import ImageFlatList from './app/components/image/ImageFlatList';



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
