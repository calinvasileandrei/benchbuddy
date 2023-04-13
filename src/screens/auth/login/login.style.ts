import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const loginStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: theme.color.background,
            flexDirection: 'column',
            marginTop: theme.spacing.double,
            paddingTop: theme.spacing.double,
        },
        logoText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xxxlarge,
            fontWeight: theme.fontWeight.bold,
        },
        imageContainer: {
            height: 250,
            width: 300,
            alignSelf: 'center',
        },
        image: {
            height: '100%',
            width: '100%',
        },
        titleContainer: {
            justifyContent: 'center',
            flexDirection: 'row',
        },
        dividerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        divider: {
            flex: 1,
            alignSelf: 'center',
            marginHorizontal: theme.spacing.base,
        },
        formContainer: {},
    });
