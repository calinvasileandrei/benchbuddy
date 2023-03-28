import {StyleSheet} from 'react-native';
import {Theme} from 'src/theme/types';

const tabBarStyles = (theme: Theme) =>
    StyleSheet.create({
        bottomTabNavigator: {
            borderTopWidth: 0,
            backgroundColor: theme.color.background,
            shadowColor: theme.color.surface,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            elevation: 2,
        },
    });

export default tabBarStyles;
