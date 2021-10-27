import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {  StyleSheet,  Text,  View} from 'react-native';
import CustomSafeAreaView from './app/components/CustomSafeAreaView';
import OfflineNotice from './app/components/OfflineNotice';
import AppNavigator from './app/navigation/app-navigation/AppNavigator';

import AuthNavigator from './app/navigation/auth-navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigation-theme';



export default function App() {

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
          {/*<AppNavigator/>*/}
          <AuthNavigator/>
      </NavigationContainer>
      <OfflineNotice/>
    </>
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
