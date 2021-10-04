import { Formik } from 'formik'
import React from 'react'
import { StyleSheet} from 'react-native'

/**Wraps all the content inserted into it with a Formik Component. */

type AppFormProps={
    initialValues: Object,
    onSubmit: (valu: any)=>any
    validationSchema: any
    children: React.ReactNode
}

export default function AppFormFormik({initialValues, onSubmit, validationSchema, children}: AppFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
        {()=>(
            <>
                {children}
            </>
        )}
        </Formik>
    )
}

const styles = StyleSheet.create({})
