//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';

import InputPlaygroudScreen from './app/screens/InputPlaygroud.Screen';
import LoginScreen from './app/screens/Login.Screen';
//import "react-native-gesture-handler"


export default function App() {

  return (
    <View style={styles.container}>
        <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
