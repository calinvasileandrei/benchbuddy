import React, {FC} from 'react'
import {View} from 'react-native'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style'

export interface LeftMessageComponentProps {
    text: string
}

export const LeftMessageComponent: FC<LeftMessageComponentProps> = ({text}) => {
    const style = useThemeStyle(loginIntroStyle)

    return (
        <View style={style.cardLeft}>
            <MyText type={'bodyText'}>{text}</MyText>
        </View>
    )
}
