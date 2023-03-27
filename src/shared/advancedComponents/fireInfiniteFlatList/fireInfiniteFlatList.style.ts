import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const fireInfiniteFlatListStyle = (theme: Theme) => StyleSheet.create({
    container:{
        flex:1,
        flexGrow:1,
        flexDirection:'column'
    },
    pullToRefresh: {
        color: theme.color.placeholder,
    }

});
