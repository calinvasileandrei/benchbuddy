import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const TabItemStyle = (theme: Theme) =>
    StyleSheet.create({
        labelFocus: {
            color: theme.color.primary,
        },
        label: {
            color: theme.color.onSurface,
        },
    });
