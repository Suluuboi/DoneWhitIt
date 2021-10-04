import React, { useState } from 'react'
import { FlatList, ImageSourcePropType, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import ListItem from '../components/ListItem'
import Screen from '../components/CustomSafeAreaView'
import images from '../config/images'
import colors from '../config/colors'
import ListItemSeparater from '../components/ListItemSeparater'
import ListItemSwipeAction from '../components/ListItemSwipeAction'
import CustomSnackBar from '../components/CustomSnackBar'

export type Message = {
    id: number,
    title: string,
    description: string,
    image: ImageSourcePropType
}

const initialMessages = [
    {
        id: 1,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        description: "D1",
        image: images.sick_sneezing
    },
    {
        id: 2,
        title: "T2 ther by the fire",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: images.wear_mask
    }
] as Message[]



function MessagesScreen(){

    const [messages, setMessages] = useState(initialMessages)
    const [refreshing, setRefreshing] = useState(false)

    function deleteMessage(message:Message) {
        setMessages(messages.filter(m=>m.id !== message.id))
    }

    function onRefresh() {
        setMessages(initialMessages)
    }

    return (
        <Screen>

            <FlatList
                data={messages}
                keyExtractor={messages=>messages.id.toString()}
                renderItem={({item})=>
                    <ListItem 
                        title={item.title} 
                        sub_title={item.description}
                        image={item.image}
                        onPress={()=>console.log(`pressed ${item.title}`)}
                        renderRightAction={()=>(
                            <ListItemSwipeAction  
                                icon={{name:'trash-can'}} 
                                onPress={()=>deleteMessage(item)}
                            />
                        )}
                        chevron
                    />
                }
                ItemSeparatorComponent={()=>(
                    <ListItemSeparater/>
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            

        </Screen>
        
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    
})
