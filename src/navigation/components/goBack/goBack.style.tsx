import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const goBackStyle = (theme: Theme) => StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.small,
    },
    title: {
        color: theme.color.primary,
    }
});
