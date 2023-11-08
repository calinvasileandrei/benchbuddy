import {RootState} from 'src/store/store'
import {WorkoutModel} from 'src/models/schema/workout.model'
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model'

const getWorkouts = (state: RootState): WorkoutModel[] => {
    return state.workout.workouts
}

const getDetailWorkout = (state: RootState): WorkoutModel | undefined => {
    return state.workout.detailWorkout
}
const getWorkoutSessionDetail = (state: RootState): WorkoutSessionModel | undefined => {
    return state.workout.workoutSessionDetail
}

export const workoutSelectors = {
    getWorkouts,
    getDetailWorkout,
    getWorkoutSessionDetail
}
