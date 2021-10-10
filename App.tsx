import React from 'react';
import {  StyleSheet,  View} from 'react-native';

import AuthNavigator from './app/navigation/auth-navigation/AuthNavigator';



export default function App() {

  

  return (
    <View style={styles.container}>
        <AuthNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});
