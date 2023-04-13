import React, {FC} from 'react';
import {View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';

export const FirstSlideScreen: FC = () => {
    const style = useThemeStyle(loginIntroStyle);

    return (
        <View key={'firstSlide'} style={style.container}>
            <MyText style={style.logoText}>{`Hello Buddy! 👋`}</MyText>
        </View>
    );
};
