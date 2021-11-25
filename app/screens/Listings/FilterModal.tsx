import React, { useCallback } from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    StyleProp,
    TouchableOpacity
} from 'react-native';
import AppButton from '../../components/AppButton';
import debounce from 'lodash.debounce';


import AppText from '../../components/AppText';
import AppTextInput from '../../components/form/AppTextInput';
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TexButton';
import TwoPointSlider from '../../components/TwoPointSlider';
import colors from '../../config/colors';
import constants from '../../config/constants';
import { SIZES } from '../../config/phone';

type SectionProps= {
    title: string, 
    onPress?: ()=>void, 
    children?: any
}

export default function FilterModal({ isVisible, onClose, onFilter }) {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    const [showFilterModal, setShowFilterModal] = React.useState(isVisible)

    const [priceRange, setPriceRange] = React.useState<undefined | any[]>()
    const [category, setCategory] = React.useState<undefined | number>()
    const debouncePriceRange = useCallback(debounce((nextValue) => setPriceRange(nextValue) , 100), [])

    React.useEffect(() => {
        if (showFilterModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => onClose());
        }
    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height > 700 ? SIZES.height - 680 : SIZES.height - 580]
    })

    

    const Section = ({ title, onPress, children } : SectionProps) => {
        return (
            <View style={{marginBottom: 20}}>
                {/* Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        //marginHorizontal: 10,
                        marginTop: 30,
                        marginBottom: 20
                    }}
                >
                    <AppText 
                        text={title}
                        style={{
                            color: colors.black,
                            left: 0
                        }}
                    />
    
                </View>
    
                {/* Content */}
                {children}
            </View>
        )
    }


    function renderPricingRange() {
        return (
            <Section
                title="Pricing Range"
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <TwoPointSlider
                        values={priceRange? priceRange : [100, 2200]}
                        min={1}
                        max={10000}
                        prefix="N$"
                        postfix=""
                        onValuesChange={(values) => debouncePriceRange(values) }
                    />
                </View>
            </Section>
        )
    }

    function renderCategories() {
        return (
            <Section
                title="Category"
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {constants.categories.map((item, index) => {
                        return (
                            <TextButton

                                key={`Tags-${index}`}
                                label={item.label}
                                labelStyle={{
                                    color: item.value == category ? colors.white : colors.meduim_grey
                                }}
                                buttonContainerStyle={{
                                    height: 50,
                                    margin: 5,
                                    paddingHorizontal: SIZES.padding,
                                    alignItems: 'center',
                                    borderRadius: 8,
                                    backgroundColor: item.value == category ? colors.primary : colors.light_grey
                                }}
                                onPress={() => setCategory(item.value)}
                            />
                        )
                    })}
                </View>
            </Section>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.transparentBlack7
                }}
            >
                {/* Transparent Background */}
                <TouchableWithoutFeedback
                    onPress={() => setShowFilterModal(false)}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: modalY,
                        width: "100%",
                        height: "100%",
                        padding: SIZES.padding,
                        borderTopRightRadius: SIZES.padding,
                        borderTopLeftRadius: SIZES.padding,
                        backgroundColor: colors.white
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <AppText style={{fontWeight: 'bold'}}  text={`Filter Your Search`}/>
                        <View style={{flex: 1}}/>
                        <IconButton
                            containerStyle={{
                                borderWidth: 2,
                                borderRadius: 10,
                                borderColor: colors.medium_grey,
                            }}
                            icon={'close-box'}
                            iconStyle={{
                                borderColor : colors.light_grey,
                                color: colors.medium_grey
                            }}
                            onPress={() => setShowFilterModal(false)}
                        />
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: Platform.OS === 'ios' ? (SIZES.height > 700 ? 250 : 180) : 180,
                        }}
                    >   

                        {/* Pricing Range */}
                        {renderPricingRange()}

                        {/* Categories */}
                        {renderCategories()}


                    </ScrollView>

                    {/* Apply Button */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: Platform.OS === 'ios' ? (SIZES.height > 700 ? 150 : 60) : 150,
                            left: 0,
                            right: 0,
                            //height: 110,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.radius,
                            backgroundColor: colors.white
                        }}
                    >
                        <AppButton
                            text={'Apply Filter'}
                            onPress={()=>{
                                onFilter(
                                    {
                                        category,
                                        priceRange
                                    }
                                )
                                setShowFilterModal(false)
                            }}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}
