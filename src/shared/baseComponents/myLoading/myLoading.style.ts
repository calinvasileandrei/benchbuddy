import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myLoadingStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.color.background,
        },
        caption: {
            marginVertical: theme.spacing.base,
        },
    });
