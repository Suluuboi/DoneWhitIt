import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, FlatList, View, Text, Animated } from 'react-native';
import openSocket from "socket.io-client";

import Card from '../../components/Card';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';
import colors from '../../config/colors';
import { FeedNavigationPages, ListingsSceenProps } from '../../navigation/feed-navigation/types';
import listingsApi from '../../api/listings/listings-api';
import { Listing } from '../../api/listings/types';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import LoadingActivity from '../../components/LoadingActivity';
import useApi from '../../hooks/useApi';
import serverInfo from '../../utility/serverInfo';
import images from '../../config/images';
import AppHeader from '../../components/AppHeader';
import AnimatedCollapsingHeader from '../../components/AnimatedCollapsingHeader';
import FilterBadge from '../../components/filter/FilterBadge';

const HEADER_HEIGHT = 70

function ListingsScreen({navigation, route}: ListingsSceenProps) {

    const { data: listings, 
            error, 
            loading, 
            request: loadListings} = useApi(listingsApi.getListings, 'listing')
    const scrollY = useRef(new Animated.Value(0)).current;
    

    useEffect(()=>{
        loadListings();
    },[])

    return (
        <CustomSafeAreaView>

            {/*<AppHeader 
                left_icon={'water'} 
                center_text={'WuZa'} 
                right_icon={'magnify'}
                //animatedValue={scrollY} 
                header_height = {header_height}
            />*/}
            <AnimatedCollapsingHeader
                headerHightPixel={HEADER_HEIGHT}
                animatedValue={scrollY}
                subHeaderHeightPercentage={14}
                headerComponent={<AppHeader header_height={HEADER_HEIGHT}/>}
                subHeaderComponent={
                    <View style={{
                        flex:1, 
                        flexDirection: 'row',        
                        backgroundColor: colors.white,
                        borderColor: 'black',
                        zIndex: 100
                        }}
                    >
                        <View style={{flex:1, flexDirection: 'column-reverse' ,backgroundColor: 'blue', paddingTop:'15%'}}>
                            <FlatList
                                horizontal 
                                showsHorizontalScrollIndicator={false} 
                                data={[{category:1}]}
                                keyExtractor={(item, index)=>index.toString()}
                                renderItem={({item})=>
                                    item &&
                                    <FilterBadge text={`${item['category']}`} clear={()=>console.log(JSON.stringify(item, null, '\t'))} />
                                }
        
                            > 
                            </FlatList>
                        </View>
                    </View>
                }
            >
            <View style={{width:'100%', height: '100%', paddingHorizontal: 10}}>
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

                <FlatList style={{width: '100%', paddingTop: HEADER_HEIGHT + 10}}
                    data={listings as Listing[]} /**listings as Listing[] */
                    keyExtractor={(item)=>item.listingId}
                    renderItem={({item})=>
                        /**getImagePath(item)+'/'+item.images[0].uri+'_full.jpg' */
                        <Card 
                            image_url={ item.images ? item.images[0]?.uri : images.no_image }
                            thumbnail_url={item.images ? item.images[0]?.thumbnailUrl : images.no_image }
                            title={item.title}
                            sub_title={item.price}    
                            onPress={()=>
                                    navigation.navigate(FeedNavigationPages.ListingDetails, 
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
                    scrollEventThrottle={16}
                    ListEmptyComponent={()=>

                        <AppText 
                            style={{textAlign: 'center'}} 
                            text={'No Listing Currently Posted, Come back later.'}
                        />
                    }
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                />

                
            }
            </View>
            </AnimatedCollapsingHeader>
            
        </CustomSafeAreaView>
    )
}

export default ListingsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingHorizontal: 10,
      backgroundColor: colors.light_grey,
      height: '100%'
      //justifyContent: 'center',
      //alignItems: 'center'
    },
    error_text: {
        color: colors.danger,
        alignSelf: 'center'
    }
});
