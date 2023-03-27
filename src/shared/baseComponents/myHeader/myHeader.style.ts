import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myHeaderStyle = (theme: Theme) => StyleSheet.create({
    container:{
        marginHorizontal: theme.spacing.base,
    },
    headerContainer:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    icon:{
        fontSize: theme.iconSize.medium,
    }
});
