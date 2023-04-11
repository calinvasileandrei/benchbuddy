import React, {FC} from 'react';
import {ActivityIndicator, View, ViewProps} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myLoadingStyle} from 'src/shared/baseComponents/myLoading/myLoading.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';

export interface MyLoadingProps {
    style?: ViewProps['style'];
    caption?: string;
}

export const MyLoading: FC<MyLoadingProps> = props => {
    const style = useThemeStyle(myLoadingStyle);
    return (
        <View style={[style.container, props.style]}>
            <ActivityIndicator />
            {props.caption && (
                <MyText style={style.caption} type={'captionText'}>
                    {props.caption}
                </MyText>
            )}
        </View>
    );
};
