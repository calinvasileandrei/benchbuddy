import React, {FC} from 'react';
import {ActivityIndicator, View, ViewProps} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myLoadingStyle} from 'src/shared/baseComponents/myLoading/myLoading.style';

export interface MyLoadingProps {
    style?: ViewProps['style'];
}

export const MyLoading: FC<MyLoadingProps> = props => {
    const style = useThemeStyle(myLoadingStyle);
    return (
        <View style={[style.container, props.style]}>
            <ActivityIndicator />
        </View>
    );
};
