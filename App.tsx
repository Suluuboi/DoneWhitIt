//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';

import InputPlaygroudScreen from './app/screens/InputPlaygroud.Screen';


export default function App() {

  return (
    <View style={styles.container}>
        <InputPlaygroudScreen></InputPlaygroudScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
