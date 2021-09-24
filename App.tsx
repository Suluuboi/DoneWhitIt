import React from 'react';
import { StyleSheet, View} from 'react-native';
import images from './app/config/images';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';

import ListingsScreen from './app/screens/Listings.Screen';
import ViewImageScreen from './app/screens/ViewImage.Screen';

export default function App() {


  return (
    <View style={styles.container}>
      <ViewImageScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
