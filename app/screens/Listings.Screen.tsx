import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../components/Card';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import colors from '../config/colors';
import { FeedNavigationPages, ListingsSceenProps } from '../navigation/feed-navigation/types';
import listingsApi from '../api/listings/listings-api';
import { Listing } from '../api/listings/types';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import LoadingActivity from '../components/LoadingActivity';
import useApi from '../hooks/useApi';

function ListingsScreen({navigation, route}: ListingsSceenProps) {

    const { data: listings, error, 
            loading, request: loadListings} = useApi(listingsApi.getListings)

    useEffect(()=>{
        loadListings()
    },[])


    return (
        <CustomSafeAreaView style={styles.container}>
            {
            
                (error && !loading) && 
                <>
                    <AppText style={styles.error_text} text={'Somthing whent wrong.'}/>
                    <AppButton  text={'Retry'} onPress={loadListings}/>
                </>
            
            }
            {/*<ActivityIndicator animating={loading} size={'large'} color={colors.primary}/>*/}
            <LoadingActivity visable={loading}/>
            
            {
            !loading &&
            <FlatList
                data={listings as Listing[]}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>
                    <Card 
                        image_url={item.images[0]?.url}
                        thumbnail_url={item.images[0].thumbnailUrl}
                        title={item.title}
                        sub_title={item.price.toString()}    
                        onPress={()=>
                                navigation.navigate(FeedNavigationPages.ListingDetails, 
                                    {
                                        images: item.images, 
                                        description: item.description, 
                                        price: item.price, 
                                        title: item.title,
                                        id: item.id,
                                        categoryId: item.categoryId,
                                        userId: item.userId
                                        
                                    }
                            )
                            
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
