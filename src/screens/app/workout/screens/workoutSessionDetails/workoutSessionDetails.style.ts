import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const workoutSessionDetailsStyle = (theme: Theme) =>
    StyleSheet.create({
        analysisTitle: {
            marginTop: theme.spacing.base
        },
        editedBadge: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        referenceRow: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        icon: {
            marginRight: theme.spacing.base
        }
    })
