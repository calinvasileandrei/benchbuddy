import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const workoutCardStyle = (theme: Theme) =>
    StyleSheet.create({
        item: {
            marginVertical: theme.spacing.base,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center'
        },
        roundContainer: {
            width: 25,
            height: 25,
            borderRadius: theme.borderRadius.base,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.color.primary,
            marginRight: theme.spacing.base
        },
        exerciseNumber: {
            color: theme.color.primary
        },
        description: {
            marginBottom: theme.spacing.small
        },
        exercises: {
            marginVertical: theme.spacing.small,
            marginHorizontal: theme.spacing.base
        }
    })
