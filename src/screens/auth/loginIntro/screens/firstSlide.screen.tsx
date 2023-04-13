import React, {FC} from 'react';
import {View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';
import PersonalTrainerImage from 'assets/personal_trainer.svg';
import {RightMessageComponent} from 'src/screens/auth/loginIntro/components/rightMessage.component';
import {LeftMessageComponent} from 'src/screens/auth/loginIntro/components/leftMessage.component';

export const FirstSlideScreen: FC = () => {
    const style = useThemeStyle(loginIntroStyle);

    return (
        <View key={'firstSlide'} style={style.container}>
            <View style={style.topContainer}>
                <View style={style.imageContainer}>
                    <PersonalTrainerImage
                        width={style.imageContainer.width}
                        height={style.imageContainer.height}
                    />
                </View>
            </View>
            <View style={style.bottomContainer}>
                <MyText style={style.logoText}>{`Hello Buddy! 👋`}</MyText>
                <RightMessageComponent
                    text={
                        'Every session is a new opportunity to improve yourself'
                    }
                />
                <LeftMessageComponent
                    text={
                        'BenchBuddy helps you to track your progress and to improve your performance.'
                    }
                />
            </View>
        </View>
    );
};
