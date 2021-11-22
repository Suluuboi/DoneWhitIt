import React from 'react';
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


import AppText from '../../components/AppText';
import AppTextInput from '../../components/form/AppTextInput';
import IconButton from '../../components/IconButton';
import TwoPointSlider from '../../components/TwoPointSlider';
import colors from '../../config/colors';
import { SIZES } from '../../config/phone';

type SectionProps= {
    title: string, 
    onPress?: ()=>void, 
    children?: any
}

export default function FilterModal({ isVisible, onClose }) {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    const [showFilterModal, setShowFilterModal] = React.useState(isVisible)

    const [deliveryTime, setDeliveryTime] = React.useState("")
    const [ratings, setRatings] = React.useState("")
    const [tags, setTags] = React.useState("")

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
            <View>
                {/* Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: SIZES.padding,
                        marginTop: 30,
                        marginBottom: 20
                    }}
                >
                    <AppText text={title}/>
    
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <AppText text={`Show All`}/>
                    </TouchableOpacity>
                </View>
    
                {/* Content */}
                {children}
            </View>
        )
    }

    function renderDistance() {
        return (
            <Section
                title="Distance"
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <TwoPointSlider
                        values={[3, 10]}
                        min={1}
                        max={20}
                        postfix="km"
                        onValuesChange={(values) => console.log(values)}
                    />
                </View>
            </Section>
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
                        values={[10, 50]}
                        min={1}
                        max={100}
                        prefix="$"
                        postfix=""
                        onValuesChange={(values) => console.log(values)}
                    />
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
                        <AppText  text={`Filter Your Search`}/>

                        <IconButton
                            containerStyle={{
                                borderWidth: 2,
                                borderRadius: 10,
                                borderColor: colors.medium_grey
                            }}
                            icon={'close-box'}
                            iconStyle={{
                                //tintColor: colors.medium_grey
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
                        {/* Distance */}
                        {renderDistance()}

                        

                        {/* Pricing Range */}
                        {renderPricingRange()}


                    </ScrollView>

                    {/* Apply Button */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: Platform.OS === 'ios' ? (SIZES.height > 700 ? 150 : 60) : 60,
                            left: 0,
                            right: 0,
                            height: 110,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.radius,
                            backgroundColor: colors.white
                        }}
                    >
                        <AppButton
                            text={'Apply Filter'}
                            onPress={()=>console.log('Filter')}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}
