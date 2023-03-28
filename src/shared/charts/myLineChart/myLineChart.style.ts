import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const myLineChartStyle = (theme: Theme) =>
    StyleSheet.create({
        chart: {
            marginVertical: 8,
            borderRadius: 16,
            padding: 10,
        },
        chartConfigStyle: {
            padding: 10,
        },
        gradientFrom: {
            color: theme.color.primaryDark,
        },
        gradientTo: {
            color: theme.color.primary,
        },
        outerContainer: {
            marginVertical: theme.spacing.base,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
