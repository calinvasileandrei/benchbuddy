import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const mySearchBarStyle = (theme: Theme) => StyleSheet.create({
    containerStyle: {
        backgroundColor: theme.color.transparent,
    },
    inputContainerStyle: {
        backgroundColor: theme.color.surface,
    },
    inputStyle: {
        color: theme.color.onSurface,
    },
    cancelButtonStyle: {
        color: theme.color.onSurface,
    },
    cursor: {
        color: theme.color.onSurface
    },
    searchIcon: {
        color: theme.color.placeholder,
    },
    placeholder: {
        color: theme.color.placeholder,
    }

});
