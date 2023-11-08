import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const myDatePickerStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {},
        card: {
            backgroundColor: theme.color.surface,

            marginHorizontal: theme.spacing.base,
            marginBottom: theme.spacing.base,

            paddingVertical: theme.spacing.small,
            paddingHorizontal: theme.spacing.base
        },
        withBorder: {
            borderWidth: 0.7,
            borderRadius: theme.borderRadius.base,
            borderColor: theme.color.placeholder
        },
        title: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: theme.spacing.base,
            color: theme.color.onSurface
        }
    })
