import React, { useEffect, useRef } from 'react'
import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AppText from '../components/AppText';
import LoadingActivity from '../components/LoadingActivity';
import AnimatedHeader from '../components/AnimatedHeader';
import images from '../config/images';
import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';
import listingsApi from '../api/listings/listings-api';
import AppButton from '../components/AppButton';
import { Listing } from '../api/listings/types';
import Card from '../components/Card';
import { AccountNavigationPages, UserListingsSceenProps } from '../navigation/account-navigation/types';
import colors from '../config/colors';


export default function UserListingsScreen({navigation}:UserListingsSceenProps) {

    const offset = useRef(new Animated.Value(0)).current;
    const {user} = useAuth()
    const { data: listings, 
        error, 
        loading, 
        request: loadListings} = useApi(listingsApi.getUserListing)

    useEffect(()=>{
        loadListings();
    },[])

    return (
        <SafeAreaProvider style={{width:'100%'}}>
            <SafeAreaView 
                style={{ flex: 1, width: '100%' }} 
            >
                {/* Add the following AnimatedHeader */}
                <AnimatedHeader 
                    image={images.chair}
                    title={user.name}
                    sub_title={'Listings'}
                    animatedValue={offset} 
                />
                
                

                    {
                
                        (error || !listings || !Array.isArray(listings) ) && 
                        <>
                            <AppText style={styles.error_text} text={'Somthing went wrong.'}/>
                            <AppButton  text={'Retry'} onPress={loadListings}/>
                        </>
                
                    }
                    
                    <LoadingActivity visable={loading}/>
                    
                    {
                        (!loading && listings && Array.isArray(listings)) &&

                        <FlatList style={{width: '100%'}}
                            data={listings as Listing[]}
                            keyExtractor={(item)=>item.listingId}
                            renderItem={({item})=>
                                <Card 
                                    image_url={ item.images ? item.images[0]?.uri : images.no_image }
                                    thumbnail_url={item.images ? item.images[0]?.thumbnailUrl : images.no_image }
                                    title={item.title}
                                    sub_title={item.price}    
                                    onPress={()=>
                                            navigation.navigate(AccountNavigationPages.ListingDetails, 
                                                {
                                                    images: item.images, 
                                                    description: item.description, 
                                                    price: item.price, 
                                                    title: item.title,
                                                    listingId: item.listingId,
                                                    categoryId: item.categoryId,
                                                    userId: item.userId
                                                    
                                                }
                                        )
                                        
                                    }
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={()=>

                                <AppText
                                    style={{textAlign: 'center'}} 
                                    text={'No Listing Currently Posted, Come back later.'}
                                />
                            }
                            contentContainerStyle={{
                                //alignItems: 'center',
                                paddingTop: 220,
                                paddingHorizontal: 10,
                                backgroundColor: colors.light_grey
                            }}
                            /*showsVerticalScrollIndicator={false}*/
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: offset } } }],
                                { useNativeDriver: false }
                            )}
                        />
                        }

                    

            </SafeAreaView>
        </SafeAreaProvider>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    scroll_view:{
        flex: 1
    },
    error_text: {
        color: colors.danger,
        alignSelf: 'center'
    }

})

