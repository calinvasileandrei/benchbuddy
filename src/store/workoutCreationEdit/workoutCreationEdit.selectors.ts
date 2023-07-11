import {RootState} from 'src/store/store'
import {WorkoutModel} from 'src/models/schema/workout.model'

const getWorkout = (state: RootState): WorkoutModel | undefined => {
    return state.workoutCreationEdit.workout
}

export const workoutCreationEditSelectors = {
    getWorkout
}
