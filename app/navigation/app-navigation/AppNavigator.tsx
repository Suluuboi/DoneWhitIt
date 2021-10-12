import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppNavigationPages, AppNavigationParams, ListingEditSceenProps } from './types';
import ListingEditScreen from '../../screens/ListingEdit.Screen'
import UserAccountInfoScreen from '../../screens/UserAccountInfo.Screen'
import FeedNavigator from '../feed-navigation/FeedNavigator'
import AccountNavigator from '../account-navigation/AccountNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import NewListingButton from './NewListingButton';

const Tab = createBottomTabNavigator<AppNavigationParams>()

export default function AppNavigator() {
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
                    
                    tabBarButton:({})=> 
                        <NewListingButton
                            onPress={()=>navigation.navigate(AppNavigationPages.ListingEdit)}
                        />,
                    tabBarIcon:({size, color})=>
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
