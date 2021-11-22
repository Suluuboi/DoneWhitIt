import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { FeedNavigationPages, FeedNavigationParams } from "./types";
import ListingsScreen from "../../screens/Listings/Listings.Screen";
import ListingDetailsScreen from "../../screens/ListingDetails.Screen";
import { useRoute } from "@react-navigation/core";
import ViewImageScreen from "../../screens/ViewImage.Screen";


const Feed = createStackNavigator<FeedNavigationParams>();

export default function FeedNavigator(){
    return (
        <Feed.Navigator>
            <Feed.Screen 
                name={FeedNavigationPages.Listings}  
                component={ListingsScreen}
                options={{headerShown: false}}
            />
            <Feed.Screen 
                name={FeedNavigationPages.ListingDetails}  
                component={ListingDetailsScreen}
                options={({route})=>({
                    //title : route.params.title,
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                })}
            />
            <Feed.Screen 
                name={FeedNavigationPages.ListingImage}  
                component={ViewImageScreen}
                options={({route})=>({
                    //title : route.params.title,
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                })}
            />
        </Feed.Navigator>
    )
    
}