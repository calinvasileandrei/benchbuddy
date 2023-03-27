import React, {FC} from 'react';
import {handleHaptic, HapticType} from 'src/utils/haptics.utils';
import DatePicker from 'react-native-date-picker';
import {dateUtils} from 'src/utils/date.utils';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myDatePickerStyle} from 'src/shared/baseComponents/myDatePicker/myDatePicker.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';

export interface MyDatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
    withHaptics?: HapticType;
    style?: StyleProp<ViewStyle>;
    withBorder?: boolean;
}

export const MyDatePicker: FC<MyDatePickerProps> = (props) => {
    const {date, setDate,withBorder, mode = 'datetime', withHaptics = 'success'} = props;
    const [showTimePicker, setShowTimePicker] = React.useState(false)

    const style = useThemeStyle(myDatePickerStyle)

    const getDateTitle = () => {
        if (mode === 'date') {
            return dateUtils.getPrettyDate(date)
        }
        if (mode === 'time') {
            return dateUtils.getPrettyTime(date)
        }
        return dateUtils.getPrettyDateAndTime(date)
    }

    return (
        <>
            <DatePicker
                modal
                open={showTimePicker}
                date={date}
                mode={mode}
                onConfirm={(date) => {
                    setShowTimePicker(false)
                    handleHaptic(withHaptics)
                    setDate(date)
                }}
                onCancel={() => {
                    setShowTimePicker(false)
                }}
            />
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <View style={[style.card,withBorder?style.withBorder:{}]}>
                    <View style={style.title}>
                        <MyText type="header3Text">{getDateTitle()}</MyText>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};
