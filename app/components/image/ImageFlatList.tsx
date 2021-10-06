import React,{useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker'

import Icon from '../Icon';
import ImageInput from './ImageInput';

/**Flatist that takes an array of ImageInfo//displays an array of ImageInput
 * Can have a max amount ninfo
 * Al
 */



export default function ImageFlatList() {

    const max = 4;
    const data = [{key:1,uri:''}]
    const [imageArray, setImageArray] = useState< ImageInfo[]>(data)

    function addImageInfo(uri: string){
        const component = [...imageArray]
        
        component[component.length - 1].uri = uri
        
        component.length < max && component.push({key: component[component.length-1].key +1, uri:''})
        
        setImageArray(component)
    }

    function changeImageInfo(image_info: ImageInfo){
        const image = [...imageArray]
        const index = image.findIndex((i)=>i.key==image_info.key)
        image[index].uri = image_info.uri
        setImageArray(image)
    }

    function removeImageInfo(image_info: ImageInfo){
        const removed_image =imageArray.filter((item)=>item.key!=image_info.key);
        if(removed_image[removed_image.length-1].uri == '' ){
            removed_image.length > max && removed_image.push({key:removed_image[removed_image.length-1].key+1, uri:''}) 
        }else{
            removed_image.push({key:removed_image[removed_image.length-1].key+1, uri:''}) 
        }

        setImageArray(removed_image);
    }



    return (
        <>
        <FlatList
            data={imageArray}
            keyExtractor={(item)=>item.key.toString()}
            renderItem={({item})=>
                <ImageInput 
                    addNextComonent={(image_info)=> addImageInfo(image_info.uri)} 
                    removeComponent={(image_info)=>removeImageInfo(image_info)} 
                    changeComponent={(image_info)=>changeImageInfo(image_info)} 
                    item={item} />
            }
            horizontal={true}
        >

        </FlatList>
        <Text>
            {JSON.stringify(imageArray, null, '\t')}
        </Text>
        </>
    )
}

const styles = StyleSheet.create({})
