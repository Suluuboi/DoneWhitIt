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
import { AppMessage } from '../api/messages/type'
import CustomSafeAreaView from '../components/CustomSafeAreaView'


function MessagesScreen(){

    const {data, loading, error, request: getUserMessagesPayload} = useApi(messagesApi.get)

    async function getMessagses(){
        
        const payload  = await getUserMessagesPayload()
        
        if(payload.ok){
            setMessages(payload.data as any)
        }
    }

    useEffect(()=>{
        console.log("Messgae Use Efect")
        getMessagses()
    },[])


    const [messages, setMessages] = useState<AppMessage[]>(data)
    const [refreshing, setRefreshing] = useState(false)

    function deleteMessage(message:AppMessage) {
        setMessages(messages.filter(m=>m.id !== message.id))
    }

    function onRefresh() {
        //setMessages(data)
        getMessagses()
    }

    return (
        <CustomSafeAreaView>

            {
            
                (error && !loading) && 
                <>
                    <AppText style={styles.error_text} text={'Somthing whent wrong.'}/>
                    <AppButton  text={'Retry'} onPress={getUserMessagesPayload}/>
                </>
        
            }

            <LoadingActivity visable={loading}/>


            {   (data.length != 0) &&
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
                <View style={styles.message_container}>
                    <AppText text={'No Messages Recieved Yet'}/>
                </View>
                
            }
            

        </CustomSafeAreaView>
        
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    message_container:{
        //flex:1,
        //padding: 10,
        backgroundColor: colors.light_grey,
        justifyContent: 'center',
        alignItems: 'center'
      },
      error_text: {
          color: colors.danger,
          alignSelf: 'center'
      }
})
