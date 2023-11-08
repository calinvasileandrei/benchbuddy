import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const menuMoreButtonStyle = (theme: Theme) =>
    StyleSheet.create({
        moreIcon: {
            color: theme.color.onSurface
        },
        containerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        menuContainer: {
            borderRadius: theme.borderRadius.double,
            backgroundColor: theme.color.surface
        },
        optionsContainer: {
            backgroundColor: theme.color.surface,
            borderRadius: theme.borderRadius.base,
            shadowColor: theme.color.background,
            borderColor: theme.color.background,
            borderWidth: 0.5,
            marginTop: 25,
            marginRight: 100
        },
        optionWrapper: {
            marginVertical: theme.spacing.base,
            marginHorizontal: theme.spacing.base
        },
        menuOptionItem: {
            marginHorizontal: theme.spacing.base
        },
        anchorStyle: {},
        triggerWrapper: {
            marginHorizontal: theme.spacing.base
        }
    })
