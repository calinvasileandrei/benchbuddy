import React, {FC} from 'react';
import {
    ActivityIndicator,
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import {myButtonStyle} from 'src/shared/baseComponents/myButton/myButton.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {handleHaptic, HapticType} from 'src/utils/haptics.utils';

export interface MyButtonProps extends TouchableOpacityProps {
    type?: 'primary' | 'outline' | 'reverse' | 'round';
    withHaptics?: HapticType;
    isLoading?: boolean;
}

export const MyButton: FC<MyButtonProps> = props => {
    const Styles = useThemeStyle(myButtonStyle);
    const {style, onPress, ...rest} = props;

    const getButtonStyle = () => {
        switch (props.type) {
            case 'primary':
                return Styles.primaryButton;
            case 'outline':
                return Styles.outlineButton;
            case 'reverse':
                return Styles.reverseButton;
            case 'round':
                return Styles.roundButton;
            default:
                return Styles.primaryButton;
        }
    };

    const getButtonTextStyle = () => {
        if (props.disabled) {
            return Styles.disabledButtonText;
        }

        switch (props.type) {
            case 'primary':
                return Styles.primaryButtonText;
            case 'outline':
                return Styles.outlineButtonText;
            case 'reverse':
                return Styles.reverseButtonText;
            default:
                return Styles.primaryButtonText;
        }
    };

    const handleOnPress = (e: GestureResponderEvent) => {
        onPress && onPress(e);
        handleHaptic(props.withHaptics);
    };

    return (
        <TouchableOpacity
            style={[Styles.button, getButtonStyle(), style]}
            onPress={e => handleOnPress(e)}
            {...rest}>
            {props.isLoading ? (
                <ActivityIndicator
                    size="small"
                    color={getButtonTextStyle().color}
                />
            ) : (
                <Text style={[Styles.buttonText, getButtonTextStyle()]}>
                    {props.children}
                </Text>
            )}
        </TouchableOpacity>
    );
};
