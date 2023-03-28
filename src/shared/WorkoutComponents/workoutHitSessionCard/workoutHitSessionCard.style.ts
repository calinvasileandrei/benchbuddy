import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const workoutHitSessionCardStyle = (theme: Theme) =>
    StyleSheet.create({
        item: {
            marginVertical: theme.spacing.base,
        },
        roundContainer: {
            width: 30,
            height: 30,
            borderRadius: theme.borderRadius.base,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            marginRight: theme.spacing.base,
            borderColor: theme.color.primary,
        },
        exerciseRow: {
            height: 30,
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        exerciseNumber: {
            color: theme.color.primary,
        },
    });
