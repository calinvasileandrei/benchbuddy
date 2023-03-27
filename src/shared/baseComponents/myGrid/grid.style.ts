import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const gridStyle = (theme: Theme) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    col:  {
        flexGrow: 1,
        justifyContent:'center',
        alignItems:'center',
    },
});
