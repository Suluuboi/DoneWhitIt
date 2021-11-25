import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, useRef } from 'react';
import {  Animated, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';

import authStorage from './app/auth/auth-storage';
import AuthContext from './app/auth/context';
import OfflineNotice from './app/components/OfflineNotice';
import AppNavigator from './app/navigation/app-navigation/AppNavigator';
import AuthNavigator from './app/navigation/auth-navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigation-theme';
import {navigationRef} from './app/navigation/root-navigation';
import MyListingsScreen from './app/screens/MyListings.Screen';
import AnimatedHeader2 from './app/components/AnimatedCollapsingHeader';
import { FlatList } from 'react-native-gesture-handler';
import ListLayout from './app/screens/AnimatedListLayoutTest.Screen';


export default function App() {

  const [user, setUser] = useState(null)
  const [ isReady, setIsReady ] = useState(false)
  

  async function restoreUser() {
      const user = await authStorage.getUser();
      if(user) setUser(user)
  }


  if(!isReady)
    return <AppLoading 
              startAsync={restoreUser} 
              onFinish={()=>setIsReady(true)}
              onError={(error)=>console.log('Error loading app', error)}  
            />

  return (
    /*<LocalNotificationTestingScreen/>*/
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ?  <AppNavigator/> : <AuthNavigator/> }

      </NavigationContainer>
      <OfflineNotice/>
    </AuthContext.Provider>
    /*<NotificationTestingScreen/>*/
    
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
