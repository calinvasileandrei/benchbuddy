import {dateUtils} from 'src/utils/date.utils';

const getThisMonthValue = () => {
    const currentDate = new Date();
    const {start, end} = dateUtils.getMonthStartEnd(currentDate);
    const startUnix = dateUtils.dateToUnixTimestamp(start);
    const endUnix = dateUtils.dateToUnixTimestamp(end);
    console.log('getThisMonthValue', start, end);
    return [`{${startUnix},${endUnix}}`];
};

const getThisWeekValue = () => {
    const currentDate = new Date();
    const {start, end} = dateUtils.getWeekStartEnd(currentDate);
    const startUnix = dateUtils.dateToUnixTimestamp(start);
    const endUnix = dateUtils.dateToUnixTimestamp(end);
    console.log('getThisWeekValue', start, end);
    return [`{${startUnix},${endUnix}}`];
};

export const myCalendarStripUtils = {
    getThisMonthValue,
    getThisWeekValue,
};
