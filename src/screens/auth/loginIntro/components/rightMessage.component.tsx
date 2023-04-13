import React, {FC} from 'react';
import {View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';

export interface RightMessageComponentProps {
    text: string;
}

export const RightMessageComponent: FC<RightMessageComponentProps> = ({
    text,
}) => {
    const style = useThemeStyle(loginIntroStyle);

    return (
        <View style={style.cardRight}>
            <View style={style.rightTextContainer}>
                <MyText style={style.cardLightMessage} type={'bodyText'}>
                    {text}
                </MyText>
            </View>
        </View>
    );
};
