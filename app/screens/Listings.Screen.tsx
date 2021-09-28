import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Card from '../components/Card';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import colors from '../config/colors';
import images from '../config/images';

type Listing = {
    name    : string,
    price   : string,
    image   : any
}

const listingItems = [
    {
        name: "Shirt",
        price: "N$ 100",
        image: images.chair
    },
    {
        name: "Air Force One",
        price: "N$ 750",
        image: images.logo
    },
    {
        name: "Covid Musk",
        price: "N$ 10",
        image: images.wear_mask
    },
    {
        name: "Sick",
        price: "N$ 40",
        image: images.sick_sneezing
    }
] as Listing[]

function ListingsScreen() {
    return (
        <CustomSafeAreaView style={styles.container}>
            <FlatList
                data={listingItems}
                keyExtractor={(item)=>item.name}
                renderItem={({item})=>
                    <Card 
                        image={item.image}
                        title={item.name}
                        sub_title={item.price}    
                    />
                }
                showsVerticalScrollIndicator={false}
            />
            
        </CustomSafeAreaView>
    )
}

export default ListingsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: 10,
      //top: 40,
      backgroundColor: colors.light_grey
    }
});
