import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, FlatList , Animated } from 'react-native';

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
import images from '../../config/images';
import AppHeader from '../../components/AppHeader';
import AnimatedCollapsingHeader from '../../components/AnimatedCollapsingHeader';
import FilterComponent from '../../components/filter/FilterComponent';
import { Filter } from '../../utility/types';
import LottieAnimation from '../../components/LottieAnimation';
import lottie from '../../config/lottie-animations';

const HEADER_HEIGHT = 70
const LISTING_LIMIT = 5

function ListingsScreen({navigation, route}: ListingsSceenProps) {

    const [filterValues, setFilterValues] = useState<Filter | undefined>()

    const { data: listings, 
            error, 
            end,
            loading, 
            request: loadListings} = useApi(listingsApi.getListings,filterValues, 'listing')
 
    const scrollY = useRef(new Animated.Value(0)).current;
    const [subHeaderHeightPercentage, setSubHeaderHeightPercentage] = useState<number>(0)
    

    async function loadMore(){
        if(!loading)
            loadListings(LISTING_LIMIT, listings,filterValues)
    }

    function renderErrorComponent(){
        return (
            <View style={{paddingTop: HEADER_HEIGHT + subHeaderHeightPercentage + 10 }}>
                <AppText style={styles.error_text} text={'Somthing went wrong.'}/>
                <AppButton  text={'Retry'} onPress={()=>loadListings(LISTING_LIMIT, listings)}/>
            </View>
        )
    }

    //if there are no filter left reduce the header size
    function reduceHeader(filterObject: Filter){
        //console.log(filterObject)
        if(filterObject?.filter){
            if(!filterObject.filter.categoryId && !filterObject.filter.price){
                setSubHeaderHeightPercentage(0)//remove header
            }else{
                setSubHeaderHeightPercentage(15)
            }
        }else{
            setSubHeaderHeightPercentage(0)
        }
    }

    useEffect(()=>{
        //console.log('filter changes')
        loadListings(LISTING_LIMIT, listings, filterValues);
        reduceHeader(filterValues)
    },[filterValues])

    return (
        <CustomSafeAreaView>

            <AnimatedCollapsingHeader
                headerHightPixel={HEADER_HEIGHT}
                animatedValue={scrollY}
                subHeaderHeightPercentage={subHeaderHeightPercentage}
                headerComponent={
                    <AppHeader 
                        left_icon={'water'} 
                        header_height={HEADER_HEIGHT} 
                        filter={filterValues}
                        changeSearchFilter={(filter)=>{
                            //console.log(filter)
                            if(filter)
                                setFilterValues({...filterValues,...filter})
                                else
                                setFilterValues(undefined)
                        }}
                        
                    />
                }
                subHeaderComponent={
                    <View style={{flex:1}}>
                        <FilterComponent
                            filter={filterValues}
                            clearFilter={(key)=>{
                                var a = {...filterValues}
                                delete a.filter[key]
                                setFilterValues({...filterValues,...a})
                            }}
                        />
                    </View>
                }
            >
            <View style={{width:'100%', height: '100%', paddingHorizontal: 10}}>
            {
                (error && !listings || !Array.isArray(listings) ) && 
                renderErrorComponent()
            }
            
            {
                (listings && Array.isArray(listings)) &&

                <FlatList 
                    style={{width: '100%'}}
                    data={listings as Listing[]}
                    keyExtractor={(item)=>item.listingId}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={150}
                    onEndReached={loadMore}
                    onEndReachedThreshold={.01}
                    renderItem={({item})=>
                        <Card 
                            image_url={ item.images ? item.images[0]?.uri : images.no_image }
                            thumbnail_url={item.images ? item.images[0]?.thumbnailUrl : images.no_image }
                            title={item.title}
                            sub_title={`N$ ${item.price}`}    
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
                    }}
                    ListEmptyComponent={()=>
                        !error ? 
                        <AppText 
                            style={{textAlign: 'center'}} 
                            text={'No Listing Currently Posted, Come back later.'}
                        />:
                        renderErrorComponent()
                    }
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    ListFooterComponent={()=>
                        <View 
                            style={{flexDirection: 'row', justifyContent: 'center'}}
                        >
                            <LoadingActivity visable={loading}/>
                            <LottieAnimation 
                                lottie={lottie.complete} 
                                visable={end}
                                loop={false}
                            />
                        </View>
                    }
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
    },
    error_text: {
        color: colors.danger,
        alignSelf: 'center'
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});
