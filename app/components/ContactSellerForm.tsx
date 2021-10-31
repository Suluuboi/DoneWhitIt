import { FormikHelpers } from 'formik'
import React from 'react'
import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native'
import * as Yup from 'yup'
import { Listing } from '../api/listings/types'

import messagesApi from '../api/messages/messages-api'
import useNotification from '../hooks/notification/useNotification'
import { AppFormFieldFormik, AppFormFormik, AppSubmitButtonFormik } from './form/formik'

type ContactSellerFormType = {
    listing: Listing
}

export default function ContactSellerForm({listing}:ContactSellerFormType) {

    const { displayNotification } = useNotification()

    async function sendMessage(messageO, fHelper: FormikHelpers<any>){
        Keyboard.dismiss()

        const res = await messagesApi.send(messageO.message.toString(), listing.id)

        if(!res.ok){
            console.log("Error getting Messages", res)
            return Alert.alert("Error","Failed to send message, try again")
        }

        fHelper?.resetForm()
        console.log('Success Success');
        
        displayNotification({content:{title:"Success", body: "Message sent successfully"}, trigger:null})
    }

    return (
        <AppFormFormik
            initialValues={{
                message: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(m, fh)=>sendMessage(m, fh)}
        >
            <AppFormFieldFormik
				maxLength={255}
				multiline
				context_field_name="message"
				numberOfLines={3}
				placeholder="Message..."
			/>
			<AppSubmitButtonFormik label="Contact Seller" />
        </AppFormFormik>
    )
}

const styles = StyleSheet.create({})

const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(5).label('Description')
})
