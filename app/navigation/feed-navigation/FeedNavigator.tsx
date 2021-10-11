import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { FeedNavigationPages, FeedNavigationParams } from "./types";
import ListingsScreen from "../../screens/Listings.Screen";
import ListingDetailsScreen from "../../screens/ListingDetails.Screen";
import { useRoute } from "@react-navigation/core";


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
                name={FeedNavigationPages.ListingsDetails}  
                component={ListingDetailsScreen}
                options={({route})=>({
                    title : route.params.title,
                    ...TransitionPresets.SlideFromRightIOS
                })}
            />
        </Feed.Navigator>
    )
    
}