import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const exerciseHeaderStyle = (theme: Theme) =>
    StyleSheet.create({
        chipContainer: {
            marginHorizontal: theme.spacing.xsmall,
            backgroundColor: theme.color.background,
            color: theme.color.primary
        },
        chip: {
            color: theme.color.onSurface
        },
        chipScrollViewContainer: {
            marginVertical: theme.spacing.xsmall
        }
    })
