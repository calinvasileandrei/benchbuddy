import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myChipStyle = (theme: Theme) =>
    StyleSheet.create({
        chipContainer: {
            borderWidth: 1.2,
            borderStyle: 'solid',
            alignSelf: 'flex-start',
            borderRadius: theme.borderRadius.double,
            paddingVertical: theme.spacing.base,
            paddingHorizontal: theme.spacing.double,
            marginVertical: theme.spacing.small,
            marginHorizontal: theme.spacing.small,
        },
        chip: {
            backgroundColor: theme.color.background,
            borderColor: theme.color.surface,
            color: theme.color.onSurface,
        },
        chipActive: {
            backgroundColor: theme.color.background,
            borderColor: theme.color.primary,
            color: theme.color.primary,
        },
    });
