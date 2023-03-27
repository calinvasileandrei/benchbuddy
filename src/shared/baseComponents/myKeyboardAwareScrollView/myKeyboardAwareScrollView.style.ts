import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myKeyboardAwareScrollViewStyle = (theme: Theme) => StyleSheet.create({
    headerContainer: {
        marginVertical: theme.spacing.double,
    }
});
