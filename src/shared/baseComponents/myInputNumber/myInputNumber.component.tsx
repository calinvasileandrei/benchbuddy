import React, {FC} from 'react'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {Input, InputProps} from '@rneui/themed'
import {myInputNumberStyle} from 'src/shared/baseComponents/myInputNumber/myInputNumber.style'

export interface MyInputProps {
    placeholder?: number
    value?: number
    onChangeNumber: (text: number) => void
    style?: InputProps['style']
    containerStyle?: InputProps['style']
    textAlign?: InputProps['textAlign']
    disabled?: boolean
}

export const MyInputNumber: FC<MyInputProps> = props => {
    const styles = useThemeStyle(myInputNumberStyle)

    const handleChangeText = (text: string) => {
        const numberText = Number(text.replace(/[^0-9]/g, ''))
        props.onChangeNumber(numberText)
    }

    const getPlaceholder = () => {
        if (props.placeholder) {
            return props.placeholder?.toFixed()
        }
        if (!props.value) {
            return '0'
        }
        return undefined
    }

    return (
        <Input
            style={[styles.input, props.style]}
            disabled={props.disabled}
            containerStyle={[styles.containerStyle, props.containerStyle]}
            inputContainerStyle={styles.inputContainer}
            value={props.value?.toFixed()}
            placeholderTextColor={styles.placeholder.color}
            textAlign={props.textAlign}
            placeholder={getPlaceholder()}
            keyboardType={'numeric'}
            onChangeText={handleChangeText}
        />
    )
}
