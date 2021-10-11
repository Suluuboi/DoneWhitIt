import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Card from '../components/Card';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import colors from '../config/colors';
import images from '../config/images';
import { FeedNavigationPages, ListingsSceenProps } from '../navigation/feed-navigation/types';
import listingsApi from '../api/listings/listings-api';
import { Listings } from '../api/listings/types';

const a = {
    "id":201,
    "title":"Red jacket",
    "images":
    [
        {  
            "url":"http://172.16.48.188:9000/assets/jacket1_full.jpg",
            "thumbnailUrl":"http://172.16.48.188:9000/assets/jacket1_thumb.jpg"
        }
    ],
    "price":100,
    "categoryId":5,
    "userId":1,
    "location":{
        "latitude":37.78825,
        "longitude":-122.4324
    }
}
    


function ListingsScreen({navigation, route}: ListingsSceenProps) {

    const [listings, setListings] = useState<Listings[] | []>([])

    async function loadListings(){
        const res = await listingsApi.getListings();
        console.log(res.data)
        const listings = res.data as Listings[]
        setListings(listings)
    }

    useEffect(()=>{
        loadListings()
    },[])

    return (
        <CustomSafeAreaView style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>
                    <Card 
                        imageUrl={item.images[0].url}
                        title={item.title}
                        sub_title={item.price.toString()}    
                        onPress={()=>
                                /*navigation.navigate(FeedNavigationPages.ListingsDetails, 
                                    {
                                        image: item.image, 
                                        description: item.price, 
                                        price: item.price, 
                                        title: item.name
                                    }
                            )*/
                            console.log('List')
                        }
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
