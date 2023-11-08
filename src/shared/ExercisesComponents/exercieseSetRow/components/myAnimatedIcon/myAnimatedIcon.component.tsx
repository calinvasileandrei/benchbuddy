import React, {FC} from 'react'
import {Icon} from '@rneui/base'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {myIconStyle} from 'src/shared/baseComponents/myIcon/myIcon.style'
import {handleHaptic, HapticType} from 'src/utils/haptics.utils'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from 'react-native-reanimated'

export interface MyAnimatedIconProps {
    iconName: string
    size?: number
    onPress?: () => void
    color?: string
    withHaptics?: HapticType
}

export const MyAnimatedIcon: FC<MyAnimatedIconProps> = props => {
    const style = useThemeStyle(myIconStyle)
    const iconSize = useSharedValue(1)

    const handleOnPress = () => {
        iconSize.value = iconSize.value == 1 ? 1.4 : 1

        if (props.onPress) {
            handleHaptic(props.withHaptics)
            // do this after 1 sec
            props.onPress()
        }
    }

    const iconAnimation = useAnimatedStyle(() => {
        const getWidth = () => {
            if (iconSize.value == 1) {
                return props.size || 30
            }
            return withDelay(300, withTiming(0, {duration: 150}))
        }

        const getScaledSize = () => {
            if (iconSize.value == 1) {
                return 1
            }
            return withSequence(
                withTiming(1.4, {duration: 150}),
                withDelay(50, withTiming(0, {duration: 250}))
            )
        }

        return {
            width: getWidth(),
            transform: [{scale: getScaledSize()}]
        }
    }, [])

    return (
        <Animated.View style={[iconAnimation]}>
            <Icon
                type="ionicon"
                onPress={props.onPress ? handleOnPress : undefined}
                name={props.iconName}
                size={props.size}
                color={props.color || style.icon.color}
            />
        </Animated.View>
    )
}
