import { useFormikContext } from 'formik'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../../../config/colors'
import AppButton from '../../AppButton'

/**NB!!!!! insert in formik component
 * Sublit action of a form handled by formik
 */

type AppSubmitButtonProps = {
    label: string,
    disabled?: boolean | null | undefined
}

export default function AppSubmitButtonFormik({label, disabled=undefined}: AppSubmitButtonProps) {

    const {handleSubmit} = useFormikContext()

    return (

        <AppButton
            text={label}
            disabled = {disabled}
            button_color={colors.primary} 
            onPress={()=>handleSubmit()}
        />
    )
}

const styles = StyleSheet.create({})
