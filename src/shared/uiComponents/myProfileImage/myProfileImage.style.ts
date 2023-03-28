import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myProfileImageStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            borderRadius: 150 / 2,
            backgroundColor: theme.color.surface,
            height: 150,
            width: 150,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            flex: 1,
            borderRadius: 150 / 2,
            height: 150,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
