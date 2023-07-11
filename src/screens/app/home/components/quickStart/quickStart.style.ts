import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const quickStartStyle = (theme: Theme) =>
    StyleSheet.create({
        animatedButton: {
            backgroundColor: theme.color.primary,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            margin: 0,
            padding: 0
        },
        iconContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: theme.spacing.base
        },
        quickStart: {
            flexDirection: 'row',
            marginHorizontal: theme.spacing.base,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            flexGrow: 1
        },
        quickStartFirstElement: {
            flex: 1,
            borderRightWidth: 1,
            flexDirection: 'row',
            borderColor: theme.color.border,
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        quickStartSecondElement: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        quickStartTextContainer: {
            position: 'absolute',
            top: 0,
            left: 0
        },
        icons: {
            color: theme.color.onSurface
        }
    })
