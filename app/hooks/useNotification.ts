import { useEffect, useRef, useState } from "react";
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import expoPushTokenApi from "../api/push-notifications/expo-push-token-api";
import { navigate } from "../navigation/root-navigation";

/**Handels Push Notifications */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
});

type UseNotificationType = {

}


export default function useNotification(notificationListener?: boolean){

    const [notification, setNotification] = useState<Notifications.NotificationResponse>();
     //const [notification, setNotification] = useState(false);
     //const notificationListener = useRef<any>();
     //const responseListener = useRef<any>();
 
    useEffect(() => {
         registerForPushNotificationsAsync()
 
         // This listener is fired whenever a notification is received while the app is foregrounded
         /*notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
             console.log('Notification recived whil in for ground');
         });*/
 
         // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
         if(notificationListener)
            /** Whatever function you give as notificationListener 
             * will be run whenever a notification is selected */
            Notifications.addNotificationResponseReceivedListener((res)=>{
                setNotification(res)
                    const data_from_notification = res.notification.request.content.data
                    const page = data_from_notification.page
                    const params = data_from_notification.params
                    if(page) goToPage(page, params)
               
            })
            
            

         /*responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
             console.log(response.notification.request.content.data);
             rootNavigation.navigate(AppNavigationPages.User)
         });*/
         
    }, [])

    return { notification }
}

/**Go to a page in the app */
function goToPage(page, args?){
    
    navigate(page, args)
        
}

/*Register The Authtoken */
async function registerForPushNotificationsAsync() {
    let token;

    try {

    if (Constants.isDevice) {
        //get permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        //request for permission
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        //console.log(token);
        await expoPushTokenApi.register({token: token});
        
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
        sound: "default", //'default' | 'defaultCritical' | 'custom' | null;
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        });
    }
    } catch (error) {
    console.log("Error getting a push notification", error);
    }

    return token;
}