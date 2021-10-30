import { useEffect, useRef, useState } from "react";
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import expoPushTokenApi from "../../api/push-notifications/expo-push-token-api";

/**Handels Push Notifications */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
});

type UseNotificationType = {
    notificationListener?: ()=>void
}


export default function useNotification(notificationListener?:(args?)=>void){

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
            
            Notifications.addNotificationResponseReceivedListener(notificationListener)//notificationListener will get the clicked notification data
            /*Notifications.addNotificationResponseReceivedListener((res)=>{
                setNotification(res)
                    const data_from_notification = res.notification.request.content.data
                    const page = data_from_notification.page
                    const params = data_from_notification.params
                    if(page) goToPage(page, params)
               
            })*/
         
    }, [])

    return { schedualNotification, displayNotification }
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

/** Message Will Apear in the scedualed seconds */
async function schedualNotification( notificationRequestInput:Notifications.NotificationRequestInput ) {

    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    return Notifications.scheduleNotificationAsync(
        notificationRequestInput, 
    );
}
/** Notification Will Apear immidaitly */
function displayNotification(notificationRequestInput?:Notifications.NotificationRequestInput) {
    notificationRequestInput.trigger = null //this will case the notification to trigger imediatly
    Notifications.scheduleNotificationAsync(
        notificationRequestInput
    )  
}