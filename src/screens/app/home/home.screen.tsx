import React, {FC} from 'react';
import {View} from 'react-native';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {homeStyle} from 'src/screens/app/home/home.style';
import {MyCalendarStripComponent} from 'src/shared/advancedComponents/myCalendarStrip/myCalendarStrip.component';
import {WorkoutSessionInfiniteFlatList} from 'src/shared/WorkoutComponents/workoutSessionInfiniteFlatList/workoutSessionInfiniteFlatList.component';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {WorkoutSessionCollectionFields} from 'src/models/typesense/workoutSession.schema';
import {dateUtils} from 'src/utils/date.utils';
import {DateChipItem} from 'src/shared/advancedComponents/myCalendarStrip/types';
import {useTheme} from 'src/theme/theme.context';
import {QuickStart} from 'src/screens/app/home/components/quickStart/quickStart.component';

export interface HomeScreenProps {}

export const HomeScreen: FC<HomeScreenProps> = props => {
  const style = useThemeStyle(homeStyle);
  const {theme} = useTheme();

  const [filterByDate, setFilterByDate] = React.useState<FilterObject>({
    field: WorkoutSessionCollectionFields.CREATED_AT,
    value: [],
  });

  const handleSelectDate = (date: Date | undefined) => {
    const newFilter: FilterObject = {
      field: WorkoutSessionCollectionFields.CREATED_AT,
      value: date ? [dateUtils.dateToUnixTimestamp(date.toDateString())] : [],
    };
    setFilterByDate(newFilter);
  };

  const handleFilterSelect = (filter: DateChipItem) => {
    setFilterByDate(filter.value);
  };

  return (
    <MySafeAreaView edges={['bottom', 'top']}>
      <View style={style.calendarHeader}>
        <MyCalendarStripComponent
          onDateSelect={handleSelectDate}
          onFilterSelect={handleFilterSelect}
        />
      </View>
      <QuickStart />
      <WorkoutSessionInfiniteFlatList filterBy={[filterByDate]} />
    </MySafeAreaView>
  );
};
