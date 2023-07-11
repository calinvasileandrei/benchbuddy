import React, {FC} from 'react'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {myTextStyle} from 'src/shared/baseComponents/myText/myText.style'
import {TypeOfText} from 'src/theme/types'
import {TextProps} from 'react-native'
import Animated from 'react-native-reanimated'

export interface MyTextProps extends TextProps {
    children?: string | string[]
    type?: TypeOfText
}

export const MyText: FC<MyTextProps> = props => {
    const styles = useThemeStyle(myTextStyle)

    const {type, style, ...rest} = props

    const getStyle = () => {
        switch (type) {
            case 'header1Text':
                return styles.header1Text
            case 'header2Text':
                return styles.header2Text
            case 'header3Text':
                return styles.header3Text
            case 'header4Text':
                return styles.header4Text
            case 'header5Text':
                return styles.header5Text
            case 'header6Text':
                return styles.header6Text
            case 'bodyText':
                return styles.bodyText
            case 'bodyBoldText':
                return styles.bodyBoldText
            case 'labelText':
                return styles.labelText
            case 'captionText':
                return styles.captionText
            default:
                return styles.bodyText
        }
    }

    return (
        <Animated.Text style={[getStyle(), style]} {...rest}>
            {props.children}
        </Animated.Text>
    )
}
