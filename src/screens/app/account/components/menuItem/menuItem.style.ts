import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const MenuItemStyle = (theme: Theme) => StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: theme.spacing.small,
        backgroundColor: theme.color.surface,
        color: theme.color.onSurface,
        paddingHorizontal: theme.spacing.base,
    },
    item:{
        color: theme.color.onSurface,
        marginHorizontal: theme.spacing.base,
    },
    itemDisabled: {
        color: theme.color.background,
        marginHorizontal: theme.spacing.base,
    }
});
