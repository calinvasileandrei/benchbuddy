import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const workoutQuickLookStyle = (theme: Theme) => StyleSheet.create({
    container: {
        height: 300,
        margin: theme.spacing.base,
        borderRadius: theme.borderRadius.base,
        backgroundColor: theme.color.surface,
        elevation: 50,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing.base,
    }
});
