import React, {FC} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {myChipStyle} from 'src/shared/baseComponents/myChip/myChip.style'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {handleHaptic, HapticType} from 'src/utils/haptics.utils'

export interface MyChipProps {
    title: string
    onPress?: () => void
    withHaptics?: HapticType
    isActive?: boolean
}

export const MyChip: FC<MyChipProps> = props => {
    const style = useThemeStyle(myChipStyle)
    const [active, setActive] = React.useState<boolean>(false)

    const getChipStyle = () => {
        if (props.isActive || (props.isActive == undefined && active)) {
            return style.chipActive
        }
        return style.chip
    }

    const handleOnPress = () => {
        if (props.onPress) {
            setActive(!active)
            props.onPress()
            handleHaptic(props.withHaptics)
        }
    }

    return (
        <TouchableOpacity onPress={handleOnPress}>
            <View style={[style.chipContainer, getChipStyle()]}>
                <MyText style={{color: getChipStyle().color}}>{props.title}</MyText>
            </View>
        </TouchableOpacity>
    )
}
