import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const loginIntroStyle = (theme: Theme) =>
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
        pagerView: {
            flex: 1,
        },
        dotContainer: {
            position: 'absolute',
            width: '100%',
            bottom: 100,
        },
        dotRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        dots: {
            width: 100,
        },
    });
