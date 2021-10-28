import { NavigationContainerRef } from "@react-navigation/core";
import React from "react"
import { AppNavigationPages } from "./app-navigation/types";
/** Holds the navigation variable that can be used 
 * by component that are not insides a Navigator */

export const navigationRef = React.createRef<any>();

/**Navigate to any screen in the app */
function navigate(name: AppNavigationPages, params?: any){
    navigationRef.current?.navigate(name,params)
}

export default {
    navigate
}