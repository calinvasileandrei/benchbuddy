import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const exercisesItemStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.color.surface,
            paddingHorizontal: theme.spacing.base,
            height: 60,
            marginVertical: theme.spacing.small
        },
        icon: {
            color: theme.color.border
        }
    })
