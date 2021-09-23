import React from 'react';
import { StyleSheet, View} from 'react-native';
import images from './app/config/images';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';

import ListingsScreen from './app/screens/Listings.Screen';

export default function App() {


  return (
    <View style={styles.container}>
      <ListingDetailsScreen title={'title'} price={"100"} description={"this is a fire description"} image={images.chair}></ListingDetailsScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
