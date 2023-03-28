import React, {FC} from 'react';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myInputStyle} from 'src/shared/baseComponents/myInput/myInput.style';
import {Input, InputProps} from '@rneui/themed';

export interface MyInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    style?: InputProps['style'];
    keyboardType?: InputProps['keyboardType'];
    numberOfLines?: InputProps['numberOfLines'];
    multiline?: InputProps['multiline'];
    disabled?: InputProps['disabled'];
}

export const MyInput: FC<MyInputProps> = props => {
    const styles = useThemeStyle(myInputStyle);
    const {style, ...rest} = props;

    return (
        <Input
            style={[styles.input, style]}
            placeholderTextColor={styles.placeholder.color}
            {...rest}
        />
    );
};
