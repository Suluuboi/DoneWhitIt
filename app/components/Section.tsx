import { Component, ReactChild } from 'react'
import React, { StyleProp, View, ViewComponent } from 'react-native'
import AppText from './AppText'

type Props = {
    children: ReactChild,
    title: string
}

type SectionProps= {
    containerStyle?: StyleProp<any>
    title: string
    children?: ChildNode
}

export class Section extends Component<Props>{
    render(){

        const { children, title } = this.props

        return (

            
            <View
                style={{
                    marginTop: 10
                }}
            >
                <AppText text={title}></AppText>
    
                    {children}
                
            </View>
        )
    }
    
}