import React, {FC} from 'react';
import {View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';

export const ThirdSlideScreen: FC = props => {
    const style = useThemeStyle(loginIntroStyle);

    return (
        <View key={'thirdSlide'} style={style.container}>
            <MyText style={style.logoText}>{`Join BenchBuddy now 🥳`}</MyText>
        </View>
    );
};
