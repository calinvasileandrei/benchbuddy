import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {dateUtils} from 'src/utils/date.utils';

const orderWorkoutSessionsByDate = (workoutSessions: WorkoutSessionModel[]) => {
    const orderedWorkouts = workoutSessions.sort((a,b)=>{
        // DESC order
        return dateUtils.getDateToMilliseconds(a.createdAt) > dateUtils.getDateToMilliseconds(b.createdAt) ? -1 : 1
    })

    return orderedWorkouts
}

export const workoutSessionsUtils = {
    orderWorkoutSessionsByDate
}
