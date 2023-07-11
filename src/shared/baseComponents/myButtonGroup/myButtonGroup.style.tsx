import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const myButtonGroupStyle = (theme: Theme) =>
    StyleSheet.create({
        selected: {
            backgroundColor: theme.color.primary,
            borderWidth: 0
        },
        item: {
            flex: 1,
            marginHorizontal: theme.spacing.xsmall,
            backgroundColor: theme.color.surface,
            borderWidth: 1,
            borderColor: theme.color.placeholder
        },
        container: {
            flexDirection: 'row',
            flex: 1
        }
    })
