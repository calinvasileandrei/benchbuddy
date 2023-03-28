import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const accountStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {},
        header: {
            marginHorizontal: theme.spacing.base,
            marginTop: theme.spacing.base,
        },
    });
