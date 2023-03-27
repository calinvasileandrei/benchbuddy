import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myScrollViewStyle = (theme: Theme) => StyleSheet.create({
    headerContainer: {
        marginVertical: theme.spacing.double,
    }
});
