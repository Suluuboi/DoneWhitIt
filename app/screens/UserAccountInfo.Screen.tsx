import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import CustomSafeAreaView from '../components/CustomSafeAreaView'
import Icon from '../components/Icon'
import ListItem from '../components/ListItem'
import ListItemSeparater from '../components/ListItemSeparater'
import colors from '../config/colors'
import images from '../config/images'

export type MenueItem = {
    key:string,
    title: string,
    icon:{
        name: string,
        backgroundColor: string
    }
}

export default function UserAccountInfoScreen() {

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
            }
        }
    ] as MenueItem[]

    return (
        <CustomSafeAreaView style={styles.container}>
            <View style={styles.user_info}>
                <ListItem
                    title={'Hans Mabngu'}
                    sub_title={"hansmbangu@gmail.com"}
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
                />
            </View>
        </CustomSafeAreaView>
    )
}

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
