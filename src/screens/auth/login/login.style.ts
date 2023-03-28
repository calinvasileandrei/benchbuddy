import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const loginStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: theme.color.background,
            justifyContent: 'space-between',

            flexDirection: 'column',
            marginTop: theme.spacing.double,
            marginBottom: theme.spacing.double,
            padding: theme.spacing.double,
        },
        logoText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xxxlarge,
            fontWeight: theme.fontWeight.bold,
        },
    });
