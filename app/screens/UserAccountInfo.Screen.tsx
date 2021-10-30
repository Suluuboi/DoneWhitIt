import * as Notifications  from 'expo-notifications'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import AppButton from '../components/AppButton'

import CustomSafeAreaView from '../components/CustomSafeAreaView'
import Icon from '../components/Icon'
import { MaterialCommunityIconsSet } from '../components/icon/types'
import ListItem from '../components/ListItem'
import ListItemSeparater from '../components/ListItemSeparater'
import colors from '../config/colors'
import images from '../config/images'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/notification/useNotification'
import { AccountNavigationPages, AccountSceenProps } from '../navigation/account-navigation/types'

export type MenueItem = {
    key:string,
    title: string,
    icon:{
        name: MaterialCommunityIconsSet,
        backgroundColor: string
    },
    taragetScreen?: AccountNavigationPages
}

export default function UserAccountInfoScreen({navigation}: AccountSceenProps) {

    const menuItems = [
        {   
            key:"1",
            title: "My Listings",
            icon:{
                name: 'format-list-bulleted',
                backgroundColor: colors.primary
            }
        },
        {   
            key:"2",
            title: "My Messages",
            icon:{
                name: 'email',
                backgroundColor: colors.secondary
            },
            taragetScreen: 'Messages'
        }
    ] as MenueItem[]

    const { user, logOut } = useAuth()
    const {displayNotification} = useNotification()
    
    function print(a){
        console.log('PRINT print Print')
        
    }
    
    return (
        <CustomSafeAreaView style={styles.container}>
            <View style={styles.user_info}>
                <ListItem
                    title={user.name}
                    sub_title={user.email}
                    image={images.wear_mask} 
                />
            </View>
            <View style={styles.categories}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem)=>menuItem.key.toString()}
                    renderItem={({item})=>
                        <ListItem 
                            title={item.title} 
                            IconComponent={<Icon 
                                name={item.icon.name}
                                background_color={item.icon.backgroundColor}
                            />}
                            onPress={()=>item.taragetScreen ? navigation.navigate(item.taragetScreen) : null}
                        />
                        
                    }
                    ItemSeparatorComponent={()=><ListItemSeparater/>}
                />
            </View>
            <View style={styles.logout}>
                <ListItem 
                    title={'Logout'}
                    IconComponent={<Icon 
                                        background_color={'#ffe66d'}
                                        name={'logout'}
                                    />
                    }
                    onPress={()=>logOut()}
                />
            </View>

            <AppButton 
                        text={'local notification'} 
                        onPress={()=>{
                            displayNotification({  
                                content:{   
                                            title:'Big Title', 
                                            body: "Body boty body",
                                            sound : true
                                        }, 
                                trigger:{seconds:1}}
                            )}
                        } 
            />
        </CustomSafeAreaView>
    )
}

/*const schedualNotification= (seconds) => {
    const schedulingOptions : Notifications.NotificationRequestInput = {
      content: {
        title: 'This is a notification',
        body: 'This is the body',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
        data: {page: "Feed"}
      },
      trigger: {
        seconds: seconds,
      },
    };
    
    Notifications.scheduleNotificationAsync(
      schedulingOptions, 
    );
}*/

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.light_grey,
        justifyContent: "flex-start"
    },
    user_info:{
        backgroundColor: colors.white,
        
        //alignItems: ""
    },
    categories:{
        marginVertical: 30,
        backgroundColor: colors.white
    },
    logout:{
        backgroundColor: colors.white,
        //alignItems: ""
    }
})
