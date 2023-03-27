import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myInputNumberStyle = (theme: Theme) => StyleSheet.create({
    input: {
        flex: 1,
        flexGrow: 1,
        color: theme.color.onSurface,
    },
    inputContainer: {
        borderBottomWidth: 0,

    },
    containerStyle: {
      height: 44
    },
    placeholder: {
        color: theme.color.placeholder,
    }
});
