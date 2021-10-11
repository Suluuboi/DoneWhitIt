import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {  StyleSheet,  View} from 'react-native';
import AppNavigator from './app/navigation/app-navigation/AppNavigator';

import AuthNavigator from './app/navigation/auth-navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigation-theme';



export default function App() {

  

  return (
    <NavigationContainer theme={navigationTheme}>
        <AppNavigator/>
    </NavigationContainer>
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
