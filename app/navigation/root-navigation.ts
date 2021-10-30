import { createRef, RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

/** This root navigation can be used in components/pages that are not encapsulated in a Stack.Navigator/Tab.Navigator */

/** import navigationRef and use it like this <NavigationContainer ref={navigationRef}> */
export const navigationRef: RefObject<NavigationContainerRef<any>> = createRef<any>(); 

/** import navigate so you can go to any page in your app */
function navigate(name: string, params?: Object) {
    navigationRef.current?.navigate(name, params);
}

export default {
  //navigationRef,
  navigate
}


