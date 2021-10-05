import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from '../Icon';
import ImageInput from './ImageInput';

export default function ImageFlatList() {

    const data = [{key:'1',info:''}, {key:'2',info:''}, {key:'3',info:''}]

    return (
        <FlatList
            data={data}
            keyExtractor={(item)=>item.key.toString()}
            renderItem={()=>
                <ImageInput/>
            }
            horizontal={true}
        >

        </FlatList>
    )
}

const styles = StyleSheet.create({})
