import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native'

import Card from '../components/Card';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import colors from '../config/colors';
import images from '../config/images';
import { FeedNavigationPages, ListingsSceenProps } from '../navigation/feed-navigation/types';
import listingsApi from '../api/listings/listings-api';
import { Listings } from '../api/listings/types';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

function ListingsScreen({navigation, route}: ListingsSceenProps) {

    const [listings, setListings] = useState<Listings[] | []>([]);
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    async function loadListings(){
        setLoading(true)
        const res = await listingsApi.getListings();
        setLoading(false)

        if(!res.ok) return setError(true)

        setError(false)    
        setListings(res.data as Listings[])
    }

    useEffect(()=>{
        loadListings()
    },[])

    return (
        <CustomSafeAreaView style={styles.container}>
            {
            
                error && 
                <>
                    <AppText style={styles.error_text} text={'Somthing whent wrong.'}/>
                    <AppButton text={'Retry'} onPress={loadListings}/>
                </>
            
            }
            <ActivityIndicator animating={loading} size={'large'} color={colors.primary}/>
            
            {
            !loading &&
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
            }
            
        </CustomSafeAreaView>
    )
}

export default ListingsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: 10,
      backgroundColor: colors.light_grey,
      justifyContent: 'center',
      alignItems: 'center'
    },
    error_text: {
        color: colors.danger,
        alignSelf: 'center'
    }
});
