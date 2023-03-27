import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const exerciseSelectionStyle = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
    }
});
