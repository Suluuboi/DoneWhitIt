import { createRef, RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef<any>> = createRef<any>();

export function navigate(name: string, params?: Object) {
    navigationRef.current?.navigate(name, params);
}


/*import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}*/


/*import React from "react"
import { AppNavigationPages } from "./app-navigation/types";*/
/** Holds the navigation variable that can be used 
 * by component that are not insides a Navigator */

//export const navigationRef = React.createRef<any>();

/**Navigate to any screen in the app */
/*function navigate(name: AppNavigationPages, params?: any){
    navigationRef.current?.navigate(name,params)
}

export default {
    navigate
}*/


