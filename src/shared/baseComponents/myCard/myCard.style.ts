import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myCardStyle = (theme: Theme) =>
    StyleSheet.create({
        card: {
            borderRadius: theme.borderRadius.base,
            backgroundColor: theme.color.surface,
            marginVertical: theme.spacing.base,
            marginHorizontal: theme.spacing.base,
            paddingHorizontal: theme.spacing.base,
        },
        title: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: theme.spacing.base,
            color: theme.color.onSurface,
        },
        cardContent: {
            margin: theme.spacing.base,
        },
    });
