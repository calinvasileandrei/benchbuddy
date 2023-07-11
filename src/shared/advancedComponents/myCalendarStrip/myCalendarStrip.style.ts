import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const myCalendarStripStyle = (theme: Theme) =>
    StyleSheet.create({
        calendar: {
            color: theme.color.surface
        },
        calendarText: {
            color: theme.color.onSurface
        },
        calendarHighlight: {
            color: theme.color.primary
        },
        calendarDisabled: {
            color: theme.color.placeholder
        },
        container: {
            paddingVertical: theme.spacing.base,
            backgroundColor: theme.color.background,
            minHeight: 100
        },
        calendarContainer: {
            height: 100,
            backgroundColor: theme.color.surface,
            borderBottomEndRadius: theme.borderRadius.base,
            borderBottomStartRadius: theme.borderRadius.base,
            paddingVertical: theme.spacing.base
        },
        chipScrollViewContainer: {
            paddingHorizontal: theme.spacing.xsmall
        },
        containerHeader: {
            height: 100,
            zIndex: 10
        },
        animatedCalendarStripContainer: {
            backgroundColor: theme.color.surface,
            borderBottomEndRadius: theme.borderRadius.base,
            borderBottomStartRadius: theme.borderRadius.base
        }
    })
