import React,{useRef, useState} from 'react'
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';

import Icon from '../Icon';
import ImageInput from './ImageInput';

/**Flatist that takes an array of ImageInfo//displays an array of ImageInput
 * Can have a max amount ninfo
 * Al
 */

type ImagePickerProps = {
    images : any[], 
    onRemovedImage: (image: any)=>void, 
    onAddImage: (image: any)=>void,
    max?: number,
    size?: number
}



export default function ImagePicker({ images = [], onRemovedImage, onAddImage, max=4, size}: ImagePickerProps ) {

const scrollView = useRef<any>();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((image) => (
            <View key={image.uri} style={styles.list}>
              <ImageInput
                size={150}
                imageUri={image.uri}
                onChangeImage={() => onRemovedImage(image)}
              />
            </View>
          ))}
          { 
            ( images.length < max) &&
            <ImageInput 
                size={size} 
                onChangeImage={(image) => onAddImage(image)} 
            />
          }
        </View>
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
      },
      list: {
        marginRight: 10,
      },
})
