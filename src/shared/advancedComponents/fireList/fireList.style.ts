import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const fireListStyle = (theme: Theme) => StyleSheet.create({
    noData: {
        flex:1,
        flexGrow:0.7,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    noDataText: {
        color: theme.color.onSurface,
    },
    pullToRefresh: {
        color: theme.color.placeholder,
    }
});
