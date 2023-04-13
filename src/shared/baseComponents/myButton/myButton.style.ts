import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myButtonStyle = (theme: Theme) => {
    return StyleSheet.create({
        button: {
            borderRadius: theme.borderRadius.base,
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: theme.spacing.base,
            marginVertical: theme.spacing.base,
            padding: theme.spacing.base,
        },
        buttonText: {
            fontSize: theme.fontSize.medium,
            fontWeight: theme.fontWeight.medium,
            textAlign: 'center',
        },
        primaryButton: {
            backgroundColor: theme.color.primary,
            borderColor: theme.color.primary,
        },
        outlineButton: {
            backgroundColor: theme.color.background,
            borderColor: theme.color.primary,
            borderWidth: 1,
        },
        reverseButton: {
            backgroundColor: theme.color.surface,
            borderColor: theme.color.surface,
        },
        primaryButtonText: {
            color: theme.color.onSurface,
        },
        outlineButtonText: {
            color: theme.color.primary,
        },
        reverseButtonText: {
            color: theme.color.onSurface,
        },
        disabledButtonText: {
            color: theme.color.placeholder,
        },
        roundButton: {
            borderRadius: (theme.spacing.double * 3) / 2,
            height: theme.spacing.double * 3,
            width: theme.spacing.double * 3,
            backgroundColor: theme.color.primary,
            borderColor: theme.color.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.color.border,
            shadowRadius: 6,
            shadowOpacity: 0.2,
        },
        roundContainer: {
            width: theme.spacing.double * 2,
            height: theme.spacing.double * 2,
        },
        darkText: {
            color: theme.color.surface,
        },
    });
};
