import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const workoutCreationStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {},
        addExercise: {
            flexDirection: 'column',
            alignItems: 'center',
            marginVertical: theme.spacing.base
        }
    })
