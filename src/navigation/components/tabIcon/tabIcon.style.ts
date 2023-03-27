import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const tabIconStyle = (theme: Theme) => StyleSheet.create({
    iconFocus: {
        color: theme.color.primary
    },
    icon: {
        color: theme.color.onSurface
    },
});
