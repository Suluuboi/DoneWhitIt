import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../screens/Login.Screen";
import WelcomScreen from "../../screens/Welcom.Screen";
import { AuthNavigationPages, AuthNavigationParams } from "./types";
import RegisterScreen from "../../screens/Register.Screen";
import navigationTheme from "../navigation-theme";


const Stack = createStackNavigator<AuthNavigationParams>();

export default function AuthNavigator(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name={AuthNavigationPages.Welcome}  component={WelcomScreen}/>
            <Stack.Screen name={AuthNavigationPages.Login}  component={LoginScreen}/>
            <Stack.Screen name={AuthNavigationPages.Register}  component={RegisterScreen}/>
        </Stack.Navigator>
    )
    
}