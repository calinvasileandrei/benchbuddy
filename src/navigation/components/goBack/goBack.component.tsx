import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';
import {useNavigation} from '@react-navigation/native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {goBackStyle} from 'src/navigation/components/goBack/goBack.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';

export interface GoBackProps {}

export const GoBack: FC<GoBackProps> = props => {
    const style = useThemeStyle(goBackStyle);
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={handleGoBack}>
            <View style={style.container}>
                <MyIcon iconName={'chevron-back-outline'} />
                <MyText style={style.title}>Back</MyText>
            </View>
        </TouchableOpacity>
    );
};
