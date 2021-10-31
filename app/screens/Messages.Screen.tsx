import React, { useEffect, useState } from 'react'
import { FlatList, ImageSourcePropType, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import ListItem from '../components/ListItem'
import Screen from '../components/CustomSafeAreaView'
import images from '../config/images'
import colors from '../config/colors'
import ListItemSeparater from '../components/ListItemSeparater'
import ListItemSwipeAction from '../components/ListItemSwipeAction'
import CustomSnackBar from '../components/CustomSnackBar'
import messagesApi from '../api/messages/messages-api'
import useApi from '../hooks/useApi'
import authStorage from '../auth/auth-storage'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import LoadingActivity from '../components/LoadingActivity'

type MessageUser = {
    id: number,
    name: string
}

export type Message = {
    content     : string,
    dateTime    : number,
    fromUser    : MessageUser
    id          : number,
    listingId   : number,
    toUser      : MessageUser
    image?      : ImageSourcePropType
    /*id: number,
    title: string,
    description: string,
    image: ImageSourcePropType*/
}

function MessagesScreen(){

    const {data, loading, error, request: getUsersMessages} = useApi(messagesApi.get)

    async function getMessagses(){
        await getUsersMessages()
        if(data){
            console.log(data)
            setMessages(data)
        }
    }

    useEffect(()=>{
        getMessagses()
    },[])


    const [messages, setMessages] = useState<Message[]>(data)
    const [refreshing, setRefreshing] = useState(false)

    function deleteMessage(message:Message) {
        setMessages(messages.filter(m=>m.id !== message.id))
    }

    function onRefresh() {
        setMessages(data)
    }

    return (
        <Screen>

            {
            
                (error && !loading) && 
                <>
                    <AppText style={styles.error_text} text={'Somthing whent wrong.'}/>
                    <AppButton  text={'Retry'} onPress={getUsersMessages}/>
                </>
        
            }

            <LoadingActivity visable={loading}/>


            {
                <FlatList
                    data={messages}
                    keyExtractor={messages=>messages.id.toString()}
                    renderItem={({item})=>
                        <ListItem 
                            title={item.fromUser?.name} 
                            sub_title={item.content}
                            image={item.image ? item.image : images.wear_mask }
                            onPress={()=>getMessagses()}
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
            }
            
            {
                (data.length === 0 )  &&
                <View style={styles.container}>
                    <AppText text={'No Messages Recieved Yet'}/>
                </View>
                
            }
            

        </Screen>
        
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
        backgroundColor: colors.light_grey,
        justifyContent: 'center',
        alignItems: 'center'
      },
      error_text: {
          color: colors.danger,
          alignSelf: 'center'
      }
})
