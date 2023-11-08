import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const myPieChartStyle = (theme: Theme) =>
    StyleSheet.create({
        chart: {
            marginVertical: 8,
            borderRadius: 16,
            padding: 10
        },
        chartConfigStyle: {
            padding: 10
        },
        outerContainer: {
            marginVertical: theme.spacing.base,
            marginHorizontal: theme.spacing.base,
            backgroundColor: theme.color.surface,
            borderRadius: theme.borderRadius.double,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            marginTop: theme.spacing.base
        }
    })
