import React, {FC} from 'react'
import {View} from 'react-native'
import {PieChart} from 'react-native-chart-kit'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {myPieChartStyle} from 'src/shared/charts/myPieChart/myPieChart.style'
import {colorUtils} from 'src/utils/color.utils'

export interface MyPieChartProps {
    data: any[]
    title?: string
    accessor: string
    width?: number
}

export const MyPieChart: FC<MyPieChartProps> = props => {
    const {data, title} = props
    const style = useThemeStyle(myPieChartStyle)
    const colors = colorUtils.generateShades('#517CFE')

    return (
        <View style={style.outerContainer}>
            {title && (
                <MyText type={'header3Text'} style={style.title}>
                    {title}
                </MyText>
            )}
            <PieChart
                data={data.map((item, index) => ({
                    legendFontColor: '#fff',
                    legendFontSize: 15,
                    color: colors[index],
                    ...item
                }))}
                accessor={props.accessor}
                width={props.width || 374} // from react-native
                height={220}
                chartConfig={{
                    style: style.chartConfigStyle,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                }}
                style={style.chart}
                backgroundColor={'transparent'}
                paddingLeft={'0'}
            />
        </View>
    )
}
