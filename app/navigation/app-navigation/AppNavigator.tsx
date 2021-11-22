import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppNavigationPages, AppNavigationParams, ListingEditSceenProps } from './types';
import ListingEditScreen from '../../screens/ListingEdit.Screen';
import FeedNavigator from '../feed-navigation/FeedNavigator'
import AccountNavigator from '../account-navigation/AccountNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NewListingButton from './NewListingButton';
import useNotification from '../../hooks/notification/useNotification';
import { NotificationResponse } from 'expo-notifications';
import rootNavigation from  '../root-navigation';
import { useNavigationState } from '@react-navigation/core';


const Tab = createBottomTabNavigator<AppNavigationParams>()

export default function AppNavigator() {
    
    const state = useNavigationState(state =>{return state});
    useNotification(reactToClickedNotification)
   //if(notificaton) console.log(notificaton)//toPage(notificaton)
   
    function reactToClickedNotification(res: NotificationResponse){
        const data_from_notification = res.notification.request.content.data //get data from notification
        if(data_from_notification){

            const page = data_from_notification.page as any //get the page
            const params = data_from_notification.params //get the rams if any

            if(page){
                rootNavigation.navigate(page, params)
            } 
        }
    }
   
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen 
                name={AppNavigationPages.Feed} 
                component={FeedNavigator} 
                options={{
                    tabBarIcon:({size, color})=>
                        <MaterialCommunityIcons 
                            name="home" 
                            size={size}
                            color={color}
                        />
                    }
                }
            />
            <Tab.Screen 
                name={AppNavigationPages.ListingEdit} 
                component={ListingEditScreen} 
                options={({navigation}: ListingEditSceenProps)=>({
                    
                    tabBarButton:({children})=> 
                        <NewListingButton
                            color={state?.index===1 ? 
                                children['props'].children[0].props.activeTintColor:
                                children['props'].children[0].props.inactiveTintColor
                            }
                            onPress={()=>navigation.navigate(AppNavigationPages.ListingEdit)}
                        />,
                    tabBarIcon:({size, color, focused})=>
                        <MaterialCommunityIcons 
                            name="plus-circle" 
                            size={size}
                            color={color}
                        />

                    }
                )}
            />
            <Tab.Screen
                name={AppNavigationPages.User} 
                component={AccountNavigator} 
                options={{
                    
                    tabBarIcon:({size, color})=>
                        <MaterialCommunityIcons 
                            name="account" 
                            size={size}
                            color={color}
                        />
                    }
                }
            />
        </Tab.Navigator>
    )
}

