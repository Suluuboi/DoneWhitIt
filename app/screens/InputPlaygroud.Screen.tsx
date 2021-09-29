import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AppPicker from '../components/AppPicker'
import AppText from '../components/AppText'
import AppTextInput from '../components/AppTextInput'
import CustomSafeAreaView from '../components/CustomSafeAreaView'

export type Category ={
  lable: string,
  value: number
}

const categories = [
  {lable:"Funiture", value:1},
  {lable:"Clothing", value:2},
  {lable:"Cameras", value:3},
] as Category[]

export default function InputPlaygroudScreen() {

    const [category, setCategory] = useState()

    return (
        <CustomSafeAreaView style={{flex:1}}>
          <AppPicker 
            selected_item={category}
            onSelectItem={(item)=>setCategory(item)}
            items={categories} 
            placeholder={'Category'}
          />
          <AppTextInput icon_name={'email'} placeholder={'Email'} />
          {/*<TextInput 
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
