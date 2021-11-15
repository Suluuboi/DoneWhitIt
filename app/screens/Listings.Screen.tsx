import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native';
import openSocket from "socket.io-client";

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
import serverInfo from '../utility/serverInfo';
import images from '../config/images';

function ListingsScreen({navigation, route}: ListingsSceenProps) {

    let [items, setItems] = useState<any>([]);
    const [fetched, setFetched] = useState(false);
    const { data: listings, error, 
            loading, request: loadListings} = useApi(listingsApi.getListings)

    useEffect(()=>{
        //loadListings()
        //New

        const socket = openSocket("http://192.168.178.33:9100");
        if (!fetched) fetchListings();

        connectToListing(socket);
    },[])

    

    let listings2 = [];

    const connectToListing = (socket) => {
        console.log('Socect connected')
        socket.on("listing", (date) => {
            if (date.action === "create") createListing(date.listing);
            if (date.action === "delete") deleteListing(date.listing);
            if (date.action === "update") updateListing(date.listing);
        });
    };

    const fetchListings = async () => {
        const { data: items, ok: response } = await listingsApi.getListings();
        console.log(items)
        if (!response) return;

        listings2 = items.slice(0);
        setItems(items);
        setFetched(true);
    };

    const createListing = async function (listing) {
        console.log('create new listing.');
        console.log(listing)
        const listingWithImages = await serverInfo.addFullAndThumbnailImage([listing]);
        console.log(listingWithImages);
        listings2.unshift(listingWithImages);

        setItems(() => [...[], ...listings2]);
    };

    const updateListing = (listing) => {
        let newListings = listings2.slice(0);
        newListings.map((obj) => {
        if (obj.listingId === listing.listingId) {
            obj.title = listing.title;
            obj.price = listing.price;
            obj.category = listing.category;
            obj.description = listing.description;
        }
        });

        setItems(newListings);
    };

    const deleteListing = (listing) => {
        listings2 = listings2.filter(function (obj) {
        return obj.listingId !== listing.listingId;
        });

        setItems(() => [...[], ...listings2]);
    };

    return (
        <CustomSafeAreaView style={styles.container}>
            
            {
                
                (error || !listings || !Array.isArray(listings) ) && 
                <>
                    <AppText style={styles.error_text} text={'Somthing went wrong.'}/>
                    <AppButton  text={'Retry'} onPress={loadListings}/>
                </>
            
            }
            
            <LoadingActivity visable={loading}/>
            
            {
                /**(!loading && listings && Array.isArray(listings)) &&*/

                <FlatList style={{width: '100%'}}
                    data={items as Listing[]} /**listings as Listing[] */
                    keyExtractor={(item)=>item.listingId}
                    renderItem={({item})=>
                        /**getImagePath(item)+'/'+item.images[0].uri+'_full.jpg' */
                        <Card 
                            image_url={ item.images ? item.images[0]?.uri : {src: images.no_image}}
                            thumbnail_url={item.images ? item.images[0]?.thumbnailUrl : {src:images.no_image}}
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
                    ListEmptyComponent={()=>

                        <AppText 
                            style={{textAlign: 'center'}} 
                            text={'No Listing Currently Posted, Come back later.'}
                        />
                    }
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
