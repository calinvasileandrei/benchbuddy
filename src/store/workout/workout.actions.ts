import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserWorkoutService} from 'src/services/app/userWorkout.service';

const workoutActionNames = createActionTypesMap('workout', [
    'getWorkouts',
]);


export const getWorkouts = createAsyncThunk(workoutActionNames.getWorkouts, async (args, thunkAPI) => {
    try {
        return UserWorkoutService.getUserWorkouts();
    } catch (e: any) {
        throw new Error('getWorkouts error', e.message)
    }
});


export const workoutActions = {
    getWorkouts
}
