import React,{useState} from 'react'
import { StyleSheet, View, FlatList } from 'react-native';

import Icon from '../Icon';
import ImageInput from './ImageInput';

/**Flatist that takes an array of ImageInfo//displays an array of ImageInput
 * Can have a max amount ninfo
 * Al
 */

type ImagePickerProps = {
    getImageURIs: (uri:ImageURI[])=>void//send the updated list of images uri's to the the parent component eg [uri:'jelo.jpg']
}



export default function ImagePicker({getImageURIs}: ImagePickerProps ) {

    const max = 4;
    const data = [{key:1,uri:''}]
    const [imageArray, setImageArray] = useState< ImageListInfo[]>(data)
    const flatList = React.useRef<any>(null)

    function addImageInfo(uri: string){
        const component = [...imageArray]
        
        component[component.length - 1].uri = uri
        
        component.length < max && component.push({key: component[component.length-1].key +1, uri:''})
        
        setImageArray(component)
        getImageURIs(getAllImageUri(component))
    }

    function changeImageInfo(image_info: ImageListInfo){
        const images = [...imageArray]
        const index = images.findIndex((i)=>i.key==image_info.key)
        images[index].uri = image_info.uri
        setImageArray(images)
        getImageURIs(getAllImageUri(images))
    }

    //get all the image uri that are seleted buy the user
    function getAllImageUri(images: ImageListInfo[]){

        const copy = JSON.parse(JSON.stringify(images)) as ImageListInfo[]

        const imgs = copy.filter((image_info)=>image_info.uri !="")
        imgs.forEach((v: any)=>{ delete v.key}); //[{uri:'hell0.jpg'}]
        return imgs as ImageURI[]
    }

    function removeImageInfo(image_info: ImageListInfo){
        const removed_image =imageArray.filter((item)=>item.key!=image_info.key);
        if(removed_image[removed_image.length-1].uri == '' ){
            removed_image.length > max && removed_image.push({key:removed_image[removed_image.length-1].key+1, uri:''}) 
        }else{
            removed_image.push({key:removed_image[removed_image.length-1].key+1, uri:''}) 
        }

        setImageArray(removed_image);
        getImageURIs(getAllImageUri(removed_image))
    }

    

    return (
        <View>
        <FlatList
            ref={flatList}
            data={imageArray}
            keyExtractor={(item)=>item.key.toString()}
            renderItem={({item})=>
                <ImageInput 
                    addNextComonent={(image_info)=> addImageInfo(image_info.uri) } 
                    removeComponent={(image_info)=> removeImageInfo(image_info)  } 
                    changeComponent={(image_info)=> changeImageInfo(image_info)  } 
                    item={item} />
            }
            horizontal={true}
            onContentSizeChange={() => {
                {flatList && flatList.current?.scrollToEnd() }
            }}
        />
        {/**<Text>
            {JSON.stringify(imageArray, null, '\t')}
        </Text>)
        </>*/}

        </View>
        
    )
}

const styles = StyleSheet.create({})
