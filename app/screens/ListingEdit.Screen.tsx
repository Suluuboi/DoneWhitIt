import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import listingsApi from '../api/listings/listings-api'
import { Listings } from '../api/listings/types'

import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CategoryPickerItem from '../components/form/CategoryPickerItem'
import { AppFormFieldFormik, AppFormFormik, AppSubmitButtonFormik } from '../components/form/formik'
import AppImagePickerFormik from '../components/form/formik/AppImagePicker.Formik'
import AppPickerFormik from '../components/form/formik/AppPicker.Formik'
import ImagePicker from '../components/image/ImagePicker'
import colors from '../config/colors'
import defaultStyles from '../config/default.styles'
import images from '../config/images'
import useLocation from '../hooks/useLocation'

import { Selection } from './InputPlaygroud.Screen'

const validationSchema = Yup.object().shape({
    images: Yup.array().min(1,'Please select at least one image.'),
    title: Yup.string().required().min(4).label("Title"),
    price: Yup.number().required().min(1).max(10000).label('Price'),
    description: Yup.string().required().min(30).label('Description'),
    category: Yup.object().required().nullable().label('Category')
})

const categories : Selection[] = [
    {label:"Funiture", value:1, icon: 'chair-rolling', background_color : defaultStyles.colors.primary },
    {label:"Clothing", value:2, icon: 'tshirt-crew', background_color: defaultStyles.colors.danger },
    {label:"Cameras", value:3, icon: 'camera', background_color: 'green'},
    {label:"Fashion", value:4, icon: 'shoe-heel', background_color : defaultStyles.colors.secondary },
    {label:"Music & Sound", value:5, icon: 'music', background_color: defaultStyles.colors.danger },
    {label:"Sport", value:6, icon: 'tennis', background_color: defaultStyles.colors.dark_gey}
]

export default function ListingEditScreen() {

    const [result, setResult] = useState()
    const location = useLocation()

    async function handleSubmit(listing: Listings){
        const result = await listingsApi.addListing(location ? {...listing, location}: listing);
        if(!result.ok)
        console.log(result)
            return alert('Could not save the listing.')
        alert('Success')
        
    }

    return (
        <CustomSafeAreaView style={styles.container}>
           
            <ScrollView>

                <AppFormFormik
                    initialValues={{
                        title: '',
                        price: '',
                        description: '',
                        category:'',
                        images:[]
                    }}
                    onSubmit={(value)=>handleSubmit(value)}
                    validationSchema={validationSchema}
                >
                    <AppImagePickerFormik name='images'/>
                    <AppFormFieldFormik  
                        maxLength={255} 
                        context_field_name={'title'} 
                        placeholder={'Title'}
                        autoCapitalize={'sentences'}
                    />
                    <AppFormFieldFormik
                        icon_name={'cash'}
                        maxLength={8}
                        context_field_name={'price'}
                        placeholder={'Price'}
                        keyboardType="numeric"
                        width={'40%'}
                    />
                    <AppPickerFormik
                        items={categories}
                        name={'category'}
                        placeholder={'Category'}
                        width={'40%'}
                        PickerItemComponent={CategoryPickerItem}
                    />
                    <AppFormFieldFormik
                        placeholder={'Description'}
                        context_field_name={'description'}
                        numberOfLines={3}
                        multiline
                    />
                    <AppSubmitButtonFormik label={'Post'}/>
                    <Text>{JSON.stringify(result, null,"\t")}</Text>
                </AppFormFormik>

            </ScrollView>

        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {padding: 10}
})
