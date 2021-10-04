import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AppPicker from '../components/form/AppPicker'
import AppText from '../components/AppText'
import AppTextInput from '../components/form/AppTextInput'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { MaterialCommunityIconsSet } from '../components/icon/types'

export type Selection ={
  label: string,
  value: number,
  icon?: MaterialCommunityIconsSet,
  background_color?: string 
}

const categories = [
  {label:"Funiture", value:1, color: 'red', },
  {label:"Clothing", value:2},
  {label:"Cameras", value:3},
] as Selection[]

export default function InputPlaygroudScreen() {

    const [category, setCategory] = useState(categories[0])

    return (
        <CustomSafeAreaView style={{flex:1}}>
          <AppPicker 
            //selected_item={category}
            onSelectItem={(item)=>setCategory(item)}
            items={categories} 
            placeholder={'Category'}
          />
          <AppTextInput 
            icon_name={'email'} 
            placeholder={'Email'} />
          {/*
          
          <TextInput 
            clearButtonMode="always"
            onChangeText={text=>setInput(text)}
            placeholder={'fire input'}
            style={{borderBottomColor: "#ccc", borderBottomWidth:1,padding: 10}}
            
          />
          <Text>{input}</Text>
          <AppTextInput 
            icon_name='email'
            placeholder={"usename"}
          />*/}
          <Text>{'----------------------------------------------'}</Text>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({})
