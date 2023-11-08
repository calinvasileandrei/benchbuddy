import React, {FC} from 'react'
import {View} from 'react-native'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style'
import {LeftMessageComponent} from 'src/screens/auth/loginIntro/components/leftMessage.component'
import {RightMessageComponent} from '../components/rightMessage.component'
import HeroImage from 'assets/hero.svg'

export const ThirdSlideScreen: FC = props => {
    const style = useThemeStyle(loginIntroStyle)

    return (
        <View key={'thirdSlide'} style={style.container}>
            <View style={style.topContainer}>
                <View style={style.imageContainer}>
                    <HeroImage
                        width={style.imageContainer.width}
                        height={style.imageContainer.height}
                    />
                </View>
            </View>
            <View style={style.bottomContainer}>
                <MyText style={style.logoText}>Unleash Your Full Potential 💪</MyText>
                <LeftMessageComponent
                    text={
                        'Join now and take the first step towards a fitter, smarter, and more rewarding fitness journey.'
                    }
                />
                <RightMessageComponent text={'We are waiting you !'} />
            </View>
        </View>
    )
}
