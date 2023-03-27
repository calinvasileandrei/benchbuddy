import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const headerStyle = (theme: Theme) => StyleSheet.create({
    header: {
        backgroundColor: theme.color.surface,
    },
    modalHeader: {
        backgroundColor: theme.color.background,
    },
    headerTitle: {
        color: theme.color.onSurface,
    },
    moreIcon: {
        color: theme.color.onSurface,
    }
});
