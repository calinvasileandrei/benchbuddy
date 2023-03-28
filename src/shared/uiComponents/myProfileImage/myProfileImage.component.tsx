import React, {FC} from 'react';
import {ActivityIndicator} from 'react-native';
import {Image} from '@rneui/themed';
import {myProfileImageStyle} from 'src/shared/uiComponents/myProfileImage/myProfileImage.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';

export interface MyProfileImageProps {
    imageUri: string;
}

export const MyProfileImage: FC<MyProfileImageProps> = props => {
    const {imageUri} = props;
    const style = useThemeStyle(myProfileImageStyle);
    return (
        <Image
            source={{uri: imageUri}}
            containerStyle={style.container}
            style={style.image}
            placeholderStyle={style.image}
            PlaceholderContent={<ActivityIndicator />}
        />
    );
};
