import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserWorkoutService} from 'src/services/app/userWorkout.service';
import {workoutSliceActions} from 'src/store/workout/workout.slice';
import {RootState} from 'src/store/store';

const workoutCreationActionNames = createActionTypesMap('workoutCreation', [
    'saveWorkout',
    'editWorkout',
]);

const saveWorkout = createAsyncThunk(
    workoutCreationActionNames.saveWorkout,
    async (args, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const workout = state.workoutCreationEdit.workout;
            if (workout) {
                await UserWorkoutService.saveUserWorkout(workout);
                await thunkAPI.dispatch(
                    workoutSliceActions.saveWorkout(workout),
                );
            }
        } catch (e: any) {
            throw new Error(`saveWorkout error ${(e as any).message}`);
        }
    },
);

const editWorkout = createAsyncThunk(
    workoutCreationActionNames.editWorkout,
    async (args, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const workout = state.workout.detailWorkout;
            const workoutEdited = state.workoutCreationEdit.workout;
            if (workout && workoutEdited) {
                // save on firestore
                await UserWorkoutService.editUserWorkout(
                    workout,
                    workoutEdited,
                );
                // update the detail workout
                thunkAPI.dispatch(
                    workoutSliceActions.setWorkoutProps({
                        detailWorkout: workoutEdited,
                    }),
                );
                // update the workout list
                thunkAPI.dispatch(
                    workoutSliceActions.editWorkout(workoutEdited),
                );
            }
        } catch (e: any) {
            throw new Error(`editWorkout error ${(e as any).message}`);
        }
    },
);

export const workoutCreationEditActions = {
    saveWorkout,
    editWorkout,
};
