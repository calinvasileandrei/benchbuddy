import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated'

type status = 'open' | 'closed'
export const useMyCalendarStripAnimations = () => {
    const containerHeight = useSharedValue<number>(0)
    const status = useSharedValue<status>('closed')

    const calendarStripContainerStyle = useAnimatedStyle(() => {
        const opacityWithTiming = withTiming(containerHeight.value > 0 ? 1 : 0, {
            duration: 400,
            easing: Easing.inOut(Easing.ease)
        })

        const heightWithTiming = withTiming(containerHeight.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease)
        })

        return {
            height: status.value === 'open' ? heightWithTiming : withDelay(200, heightWithTiming),
            opacity:
                status.value === 'closed' ? opacityWithTiming : withDelay(200, opacityWithTiming)
        }
    }, [containerHeight])

    const openCalendarStrip = () => {
        containerHeight.value = 100
        status.value = 'open'
    }

    const closeCalendarStrip = () => {
        containerHeight.value = 0
        status.value = 'closed'
    }

    return {
        openCalendarStrip,
        closeCalendarStrip,
        calendarStripContainerStyle
    }
}
