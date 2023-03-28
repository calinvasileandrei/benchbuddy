import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myDialogStyle = (theme: Theme) =>
    StyleSheet.create({
        overlay: {
            backgroundColor: theme.color.background,
            borderRadius: theme.borderRadius.base,
        },
        title: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.large,
            fontWeight: theme.fontWeight.bold,
        },
        defaultTitle: {
            color: theme.color.onSurface,
        },
        primaryTitle: {
            color: theme.color.primary,
        },
        destructiveTitle: {
            color: theme.color.danger,
        },
    });
