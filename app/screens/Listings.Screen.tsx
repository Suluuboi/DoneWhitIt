import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Card from '../components/Card';
import images from '../config/images';

function ListingsScreen() {
    return (
        <View style={styles.container}>
            <Card image={images.logo} title={"Dog"} sub_title={"N$100"}/>
            <Card image={images.chair} title={"Chair"} sub_title={"N$50"}/>
        </View>
    )
}

export default ListingsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: 10,
      top: 40,
      backgroundColor:'#f8f4f4'
    }
});
