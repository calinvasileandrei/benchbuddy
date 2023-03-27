import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const exerciseSetCreatorStyle = (theme: Theme) => StyleSheet.create({
    container: {
        marginVertical: theme.spacing.base,
    },
    numberRow: {
        justifyContent: 'center',
        maxWidth: 30,
        padding: theme.spacing.base,
    },
    rowContainer: {
        backgroundColor: theme.color.surface,
        borderBottomWidth: 0.2,
        borderBottomColor: theme.color.border,
        marginBottom: theme.spacing.base,
    },
    roundContainer: {
        width: 25,
        height: 25,
        borderRadius: theme.borderRadius.base,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.color.primary,

    },
    exerciseNumber: {
        color: theme.color.primary,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        marginBottom: 8
    },
    deleteText: {
        color: theme.color.danger,
    }
});
