const getDateToMilliseconds = (date: string): number => {
    return new Date(date).getTime()
}

const dateToUnixTimestamp = (date: string): number => {
    return Math.floor(getDateToMilliseconds(date) / 1000)
}

const dateFromUnixTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toISOString()
}

const prettyDateFromUnixTimestamp = (timestamp: number): string => {
    const date = dateUtils.dateFromUnixTimestamp(timestamp)
    return dateUtils.getPrettyDateAndTime(date)
}

const getMonthStartEnd = (date: Date): {start: string; end: string} => {
    // Get the current year and month
    const year = date.getFullYear()
    const month = date.getMonth()

    // Get the first day of the current month
    const firstDayOfMonth = new Date(year, month, 1)

    // Get the last day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0)

    // Format the dates as strings
    const start = firstDayOfMonth.toISOString().substring(0, 10)
    const end = lastDayOfMonth.toISOString().substring(0, 10)
    return {
        start,
        end
    }
}

const getYearStartEnd = (date: Date): {start: string; end: string} => {
    // Get the current year and month
    const year = date.getFullYear()

    // Get the first day of the current year
    const firstDayOfYear = new Date(year, 0, 1)

    // Get the last day of the current year
    const lastDayOfYear = new Date(year, 12, 0)

    // Format the dates as strings
    const start = firstDayOfYear.toISOString().substring(0, 10)
    const end = lastDayOfYear.toISOString().substring(0, 10)
    return {
        start,
        end
    }
}

const getWeekStartEnd = (date: Date): {start: string; end: string} => {
    // Calculate the first day of the current week
    const firstDayOfWeek = new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000)

    // Calculate the last day of the current week
    const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000)

    // Format the dates as strings
    const start = firstDayOfWeek.toISOString().substring(0, 10)
    const end = lastDayOfWeek.toISOString().substring(0, 10)
    return {
        start,
        end
    }
}

const getPrettyDate = (date: Date | string | undefined): string => {
    if (date === undefined) {
        date = new Date()
    }
    if (typeof date === 'string') {
        date = new Date(date)
    }
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const getPrettyDateAndTime = (date: Date | string | undefined): string => {
    if (date === undefined) {
        date = new Date()
    }
    if (typeof date === 'string') {
        date = new Date(date)
    }
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

const getPrettyTime = (date: Date | string | undefined): string => {
    if (date === undefined) {
        date = new Date()
    }
    if (typeof date === 'string') {
        date = new Date(date)
    }
    return date.toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })
}

export const dateUtils = {
    getDateToMilliseconds,
    dateToUnixTimestamp,
    dateFromUnixTimestamp,
    getMonthStartEnd,
    getYearStartEnd,
    getWeekStartEnd,
    getPrettyDate,
    getPrettyDateAndTime,
    getPrettyTime,
    prettyDateFromUnixTimestamp
}
