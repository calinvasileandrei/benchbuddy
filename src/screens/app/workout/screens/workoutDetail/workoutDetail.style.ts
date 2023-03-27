import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const workoutDetailStyle = (theme: Theme) => StyleSheet.create({
    item:{
        marginVertical: theme.spacing.base,
    },
    exerciseName:{
        marginBottom: theme.spacing.base,
    },
});
