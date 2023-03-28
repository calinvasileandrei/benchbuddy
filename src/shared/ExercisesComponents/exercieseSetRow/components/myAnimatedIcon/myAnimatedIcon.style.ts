import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myAnimatedIconStyle = (theme: Theme) =>
    StyleSheet.create({
        icon: {
            color: theme.color.primary,
        },
    });
