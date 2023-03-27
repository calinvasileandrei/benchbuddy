import React, {FC} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import {
    myKeyboardAwareScrollViewStyle
} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';

export interface MyKeyboardAwareScrollViewProps {
    title?: string;
    children: React.ReactNode
}

export const MyKeyboardAwareScrollView: FC<MyKeyboardAwareScrollViewProps> = (props) => {
    const style = useThemeStyle(myKeyboardAwareScrollViewStyle)
    return (
        <KeyboardAwareScrollView extraScrollHeight={30}>
            {props.title &&
                <View style={style.headerContainer}>
                    <MyHeader title={props.title} />
                </View>}
            {props.children}
        </KeyboardAwareScrollView>
    );
};
