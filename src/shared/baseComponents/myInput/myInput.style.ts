import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const myInputStyle = (theme: Theme) =>
    StyleSheet.create({
        input: {
            flex: 1,
            flexGrow: 1,
            color: theme.color.onSurface
        },
        inputContainer: {
            borderBottomWidth: 1,
            borderBottomColor: theme.color.placeholder,
            paddingHorizontal: theme.spacing.base
        },
        placeholder: {
            color: theme.color.placeholder
        }
    })
