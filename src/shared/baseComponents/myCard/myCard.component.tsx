import React, {FC} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {myCardStyle} from 'src/shared/baseComponents/myCard/myCard.style'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'

export interface MyCardProps {
    title?: string
    rightElement?: React.ReactNode
    children?: React.ReactNode
    onPress?: () => void
}

export const MyCard: FC<MyCardProps> = props => {
    const {title, onPress} = props
    const style = useThemeStyle(myCardStyle)

    const cardRender = () => {
        return (
            <View style={style.card}>
                {title && (
                    <View style={style.title}>
                        <MyText type="header3Text">{title}</MyText>
                        {props.rightElement && props.rightElement}
                    </View>
                )}
                {props.children && <View style={style.cardContent}>{props.children}</View>}
            </View>
        )
    }

    const withOnPress = () => {
        return <TouchableOpacity onPress={onPress}>{cardRender()}</TouchableOpacity>
    }

    return onPress ? withOnPress() : cardRender()
}
