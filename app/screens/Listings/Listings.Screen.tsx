import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native';
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
import FilterComponent from '../../components/filter/FilterComponent';
import { Filter } from '../../utility/types';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';

const HEADER_HEIGHT = 70

function ListingsScreen({navigation, route}: ListingsSceenProps) {

    const { data: listings, 
            error, 
            loading, 
            request: loadListings} = useApi(listingsApi.getListings, 'listing')

    const scrollY = useRef(new Animated.Value(0)).current;
    const [subHeaderHeightPercentage, setSubHeaderHeightPercentage] = useState<number>(0)
    const [filterValues, setFilterValues] = useState<Filter | undefined>()

    async function loadMore(){
        if(!loading)
            loadListings(listings)
            console.log('Load more.')
    }

    //if there are no filter left reduce the header size
    function reduceHeader(filterObject: Filter){

        console.log(filterObject)

        if(filterObject?.filter){
            if(!filterObject.filter.category && !filterObject.filter.priceRange){
                setSubHeaderHeightPercentage(0)//remove header
            }else{
                setSubHeaderHeightPercentage(15)
            }
        }else{
            setSubHeaderHeightPercentage(0)
        }
    }
    

    useEffect(()=>{
        loadListings(listings);
        reduceHeader(filterValues)
    },[filterValues])

    return (
        <CustomSafeAreaView>

            <AnimatedCollapsingHeader
                headerHightPixel={HEADER_HEIGHT}
                animatedValue={scrollY}
                subHeaderHeightPercentage={subHeaderHeightPercentage}
                headerComponent={<AppHeader left_icon={'water'} 
                                            header_height={HEADER_HEIGHT} 
                                            changeSearchFilter={(filter)=>{
                                                //console.log(filter)
                                                if(filter)
                                                    setFilterValues({...filterValues,...filter})
                                                else
                                                    setFilterValues(undefined)
                                            }}
                                            filter={filterValues}
                                    />
                                }
                subHeaderComponent={
                    <View style={{flex:1}}>
                        <FilterComponent
                            filter={filterValues}
                            clearFilter={(key)=>{
                                var a = {...filterValues}
                                delete a.filter[key]
                                //console.log(a)
                                setFilterValues({...filterValues,...a})
                                
                            }}
                        />
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
            
            {
                (!loading && listings && Array.isArray(listings)) &&

                <FlatList style={{width: '100%'}}
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
                    contentContainerStyle={{
                        paddingTop: HEADER_HEIGHT + subHeaderHeightPercentage + 10,
                        //paddingBottom: HEADER_HEIGHT
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={150}
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
                    onStartReached={loadMore}
                    onEndReached={null}
                    onEndReachedThreshold={.01}
                    ListFooterComponent={()=><LoadingActivity visable={loading}/>}
                />

                
            }
            
            {/**<Text>{JSON.stringify(filterValues, null, '\t')}</Text>*/}
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
