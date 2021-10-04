import React from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CategoryPickerItem from '../components/form/CategoryPickerItem'
import { AppFormFieldFormik, AppFormFormik, AppSubmitButtonFormik } from '../components/form/formik'
import AppPickerFormik from '../components/form/formik/AppPicker.Formik'

import { Selection } from './InputPlaygroud.Screen'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(4).label("Title"),
    price: Yup.number().required().min(1).max(10000).label('Price'),
    description: Yup.string().required().min(30).label('Description'),
    category: Yup.object().required().nullable().label('Category')
})

const categories = [
    {label:"Funiture", value:1},
    {label:"Clothing", value:2},
    {label:"Cameras", value:3}
] as Selection[]

export default function ListingEditScreen() {
    return (
        <CustomSafeAreaView style={styles.container}>
            <AppFormFormik
                initialValues={{
                    title: '',
                    price: '',
                    description: '',
                    category:''
                }}
                onSubmit={(value)=>console.log(value)}
                validationSchema={validationSchema}
            >
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
                    PickerItemComponent={
                        <CategoryPickerItem />
                    }
                />
                <AppFormFieldFormik
                    placeholder={'Description'}
                    context_field_name={'description'}
                    numberOfLines={3}
                />
                <AppSubmitButtonFormik label={'Post'} disabled={true}/>
            </AppFormFormik>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {padding: 10}
})
