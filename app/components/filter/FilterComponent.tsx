import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import constants from '../../config/constants'
import { Filter, FilterValues } from '../../utility/types'
import FilterBadge from './FilterBadge'

type FilterComponoentProps = {
    filter: Filter | undefined,
    clearFilter: (filterKey: string)=>void
}

export default function FilterComponent({filter, clearFilter}: FilterComponoentProps) {
    return (
        <View style={{flex:1, flexDirection: 'column' }}>
            <FlatList
                style={{position: 'absolute', bottom: 0}}
                horizontal 
                showsHorizontalScrollIndicator={false} 
                data={[filter]}
                keyExtractor={(item, index)=>index.toString()}
                renderItem={({item})=>

                    item && (
                        
                        item.filter &&(
                            <>

                                <>{
                                    item.filter.category &&
                                    <FilterBadge
                                        text={`Category: ${constants.getCategoryName(item.filter.category)}`} 
                                        clear={()=>{
                                            clearFilter('category')
                                            //console.log(JSON.stringify(item, null, '\t'))
                                        }}
                                    />
                                }</>

                                <>{
                                    item.filter.priceRange &&
                                    <FilterBadge
                                        text={`Price: N$${item.filter.priceRange[0]} - N$${item.filter.priceRange[1]}`} 
                                        clear={()=>{
                                            clearFilter('priceRange')
                                            //console.log(JSON.stringify(item, null, '\t'))
                                        }}
                                    />
                                }</>
                            
                            </>
                        )
                            
                    )   
            
                }    
            />       
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    
})


