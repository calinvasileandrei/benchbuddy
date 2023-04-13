import React, {FC} from 'react';
import {View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';
import FitnessStatsImage from 'assets/fitness_stats.svg';
import {RightMessageComponent} from 'src/screens/auth/loginIntro/components/rightMessage.component';
import {LeftMessageComponent} from 'src/screens/auth/loginIntro/components/leftMessage.component';

export const SecondSlideScreen: FC = props => {
    const style = useThemeStyle(loginIntroStyle);

    return (
        <View key={'secondSlide'} style={style.container}>
            <View style={style.topContainer}>
                <View style={style.imageContainer}>
                    <FitnessStatsImage
                        width={style.imageContainer.width}
                        height={style.imageContainer.height}
                    />
                </View>
            </View>
            <View style={style.bottomContainer}>
                <MyText style={style.logoText}>
                    Transform Your Training 🏋️‍♀️
                </MyText>
                <LeftMessageComponent
                    text={'Improve with easy-to-understand metrics'}
                />
                <RightMessageComponent
                    text={
                        'Use Artificial Intelligence to check your exercises form'
                    }
                />
                <LeftMessageComponent text={'Monitor your performance'} />
            </View>
        </View>
    );
};
