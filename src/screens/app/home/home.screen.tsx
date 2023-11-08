import React, {FC} from 'react'
import {View} from 'react-native'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {homeStyle} from 'src/screens/app/home/home.style'
import {MyCalendarStripComponent} from 'src/shared/advancedComponents/myCalendarStrip/myCalendarStrip.component'
import {WorkoutSessionInfiniteFlatList} from 'src/shared/WorkoutComponents/workoutSessionInfiniteFlatList/workoutSessionInfiniteFlatList.component'
import {DateChipItem} from 'src/shared/advancedComponents/myCalendarStrip/types'
import {QuickStart} from 'src/screens/app/home/components/quickStart/quickStart.component'
import {FilterObject} from 'src/models/generalTypes'

export interface HomeScreenProps {}

export const HomeScreen: FC<HomeScreenProps> = props => {
    const style = useThemeStyle(homeStyle)

    const [filterByDate, setFilterByDate] = React.useState<FilterObject>({
        field: 'createdAt',
        operator: 'BETWEEN',
        value: []
    })

    const handleFilterSelect = (filter: DateChipItem) => {
        setFilterByDate(filter.value)
    }

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <View style={style.calendarHeader}>
                <MyCalendarStripComponent onFilterSelect={handleFilterSelect} />
            </View>
            <QuickStart />
            <WorkoutSessionInfiniteFlatList filterBy={[filterByDate]} />
        </MySafeAreaView>
    )
}
