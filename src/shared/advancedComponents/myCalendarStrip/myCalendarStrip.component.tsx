import React, {FC} from 'react';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myCalendarStripStyle} from 'src/shared/advancedComponents/myCalendarStrip/myCalendarStrip.style';
import {ScrollView, View} from 'react-native';
import {MyChip} from 'src/shared/baseComponents/myChip/myChip.component';
import {stringUtils} from 'src/utils/string.utils';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import {myCalendarStripUtils} from 'src/shared/advancedComponents/myCalendarStrip/myCalendarStrip.utils';
import {DateChipItem} from 'src/shared/advancedComponents/myCalendarStrip/types';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import Animated from 'react-native-reanimated';
import {useMyCalendarStripAnimations} from 'src/shared/advancedComponents/myCalendarStrip/useMyCalendarStripAnimations';

export interface MyCalendarStripComponentProps {
  onDateSelect?: (date: Date | undefined) => void;
  onFilterSelect?: (filter: DateChipItem) => void;
}

export const MyCalendarStripComponent: FC<
  MyCalendarStripComponentProps
> = props => {
  const style = useThemeStyle(myCalendarStripStyle);
  const [activeDate, setActiveDate] = React.useState<string | undefined>('All');
  const [openCalendar, setOpenCalendar] = React.useState<boolean>(false);
  const {openCalendarStrip, closeCalendarStrip, calendarStripContainerStyle} =
    useMyCalendarStripAnimations();

  const options: DateChipItem[] = [
    {id: 0, name: 'All', value: {field: 'createdAt', value: []}},
    {
      id: 1,
      name: 'Month',
      value: {
        field: 'createdAt',
        value: myCalendarStripUtils.getThisMonthValue(),
      },
    },
    {
      id: 2,
      name: 'Week',
      value: {
        field: 'createdAt',
        value: myCalendarStripUtils.getThisWeekValue(),
      },
    },
    {id: 3, name: 'Pick a day', value: {field: 'createdAt', value: []}},
  ];

  const handleDateSelect = (date: moment.Moment) => {
    if (!props.onDateSelect) return;
    const dateObject = new Date(date.year(), date.month(), date.date());
    props.onDateSelect(dateObject);
  };

  const renderChip = (item: DateChipItem) => {
    const handleChipPress = () => {
      closeCalendarStrip();
      setActiveDate(item.name);
      props.onFilterSelect?.(item);
      setOpenCalendar(false);
    };
    const handleOpenCalendarStrip = () => {
      if (openCalendar) {
        closeCalendarStrip();
        setActiveDate('All');
        setOpenCalendar(false);
        props.onFilterSelect?.(options[0]);
        return;
      }
      openCalendarStrip();
      setActiveDate(item.name);
      setOpenCalendar(!openCalendar);
    };
    if (item.id === 3) {
      return (
        <MyChip
          key={item.name}
          title={stringUtils.capitalizeFirstLetter(item.name)}
          withHaptics={'success'}
          isActive={activeDate === item.name}
          onPress={handleOpenCalendarStrip}
        />
      );
    }
    return (
      <MyChip
        key={item.name}
        title={stringUtils.capitalizeFirstLetter(item.name)}
        withHaptics={'impactMedium'}
        isActive={activeDate === item.name}
        onPress={handleChipPress}
      />
    );
  };

  return (
    <View style={[style.container]}>
      <View style={style.containerHeader}>
        <MyHeader title={'Workouts'} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={style.chipScrollViewContainer}
          contentContainerStyle={{alignItems: 'center'}}>
          {options?.map(renderChip)}
        </ScrollView>
      </View>
      <Animated.View
        style={[
          style.animatedCalendarStripContainer,
          calendarStripContainerStyle,
        ]}>
        {openCalendar && (
          <CalendarStrip
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: 'transparent',
            }}
            onDateSelected={handleDateSelect}
            selectedDate={undefined}
            style={style.calendarContainer}
            calendarColor={style.calendar.color}
            dateNumberStyle={style.calendarText}
            dateNameStyle={style.calendarText}
            highlightDateNumberStyle={style.calendarHighlight}
            highlightDateNameStyle={style.calendarHighlight}
            disabledDateNameStyle={style.calendarDisabled}
            disabledDateNumberStyle={style.calendarDisabled}
            calendarHeaderStyle={style.calendarText}
            scrollable={true}
            scrollerPaging={true}
          />
        )}
      </Animated.View>
    </View>
  );
};
