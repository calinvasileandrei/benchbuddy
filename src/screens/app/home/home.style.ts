import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const homeStyle = (theme: Theme) =>
    StyleSheet.create({
        calendarHeader: {
            borderBottomEndRadius: theme.spacing.base,
            borderBottomStartRadius: theme.spacing.base,
            backgroundColor: theme.color.surface,
        },
    });
