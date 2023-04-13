import React, {FC} from 'react';
import {View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';

export const SecondSlideScreen: FC = props => {
    const style = useThemeStyle(loginIntroStyle);

    return (
        <View key={'secondSlide'} style={style.container}>
            <MyText
                type={'header1Text'}>{`Start this journey with us 🏋️‍♀️`}</MyText>
        </View>
    );
};
