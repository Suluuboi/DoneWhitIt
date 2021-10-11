import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { AccountNavigationPages, AccountNavigationParams } from "./types";
import ListingDetailsScreen from "../../screens/ListingDetails.Screen";
import UserAccountInfoScreen from "../../screens/UserAccountInfo.Screen";
import MessagesScreen from "../../screens/Messages.Screen";


const Account = createStackNavigator<AccountNavigationParams>();

export default function AccountNavigator(){
    return (
        <Account.Navigator>
            <Account.Screen name={AccountNavigationPages.Account}  component={UserAccountInfoScreen}/>
            <Account.Screen 
                name={AccountNavigationPages.Messages}  
                component={MessagesScreen}
                options={({route})=>({
                    //title : '',
                    ...TransitionPresets.SlideFromRightIOS
                })}
            />
        </Account.Navigator>
    )
    
}