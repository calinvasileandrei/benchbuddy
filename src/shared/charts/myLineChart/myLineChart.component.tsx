import React, {FC} from 'react'
import {View} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {myLineChartStyle} from 'src/shared/charts/myLineChart/myLineChart.style'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart'

export interface MyLineChartProps {
    data: LineChartData
    title?: string
    yAxisSuffix?: string
    width?: number
}

export const MyLineChart: FC<MyLineChartProps> = props => {
    const {data, yAxisSuffix, title} = props
    const style = useThemeStyle(myLineChartStyle)

    return (
        <View style={style.outerContainer}>
            {title && <MyText type={'header3Text'}>{title}</MyText>}
            <LineChart
                data={data}
                width={props.width || 374} // from react-native
                height={220}
                yAxisSuffix={yAxisSuffix}
                chartConfig={{
                    style: style.chartConfigStyle,
                    backgroundGradientFrom: style.gradientFrom.color,
                    backgroundGradientTo: style.gradientTo.color,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                }}
                bezier
                yLabelsOffset={5}
                style={style.chart}
            />
        </View>
    )
}
