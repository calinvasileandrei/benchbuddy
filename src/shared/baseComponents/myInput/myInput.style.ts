import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myInputStyle = (theme: Theme) =>
    StyleSheet.create({
        input: {
            flex: 1,
            flexGrow: 1,
            color: theme.color.onSurface,
        },
        placeholder: {
            color: theme.color.placeholder,
        },
    });
