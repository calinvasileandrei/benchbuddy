import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myTextStyle = (theme: Theme) =>
    StyleSheet.create({
        header1Text: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xlarge,
            fontWeight: theme.fontWeight.bold,
        },
        header2Text: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.large,
            fontWeight: theme.fontWeight.bold,
        },
        header3Text: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.medium,
            fontWeight: theme.fontWeight.bold,
        },
        header4Text: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.small,
            fontWeight: theme.fontWeight.bold,
        },
        header5Text: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xsmall,
            fontWeight: theme.fontWeight.bold,
        },
        header6Text: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xxsmall,
            fontWeight: theme.fontWeight.bold,
        },
        bodyText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.medium,
            fontWeight: theme.fontWeight.regular,
        },
        bodyBoldText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.medium,
            fontWeight: theme.fontWeight.bold,
        },
        labelText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xsmall,
            fontWeight: theme.fontWeight.regular,
        },
        captionText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xxsmall,
            fontWeight: theme.fontWeight.regular,
        },
    });
