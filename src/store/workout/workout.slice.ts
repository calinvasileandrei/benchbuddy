import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {workoutActions} from 'src/store/workout/workout.actions';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';

interface WorkoutProps {
    detailWorkout?: WorkoutModel;
    workoutSessionDetail?: WorkoutSessionModel;
}

export interface WorkoutState {
    workouts: WorkoutModel[];
    detailWorkout?: WorkoutModel;
    workoutSessionDetail?: WorkoutSessionModel;
}

const initialState: WorkoutState = {
    workouts: [],
};

export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        saveWorkout: (state, action: PayloadAction<WorkoutModel>) => {
            state.workouts = [action.payload, ...state.workouts];
        },
        editWorkout: (state, action: PayloadAction<WorkoutModel>) => {
            const index = state.workouts.findIndex(
                workout => workout._id === action.payload._id,
            );
            state.workouts[index] = action.payload;
            state.detailWorkout = action.payload;
        },
        deleteWorkout: (state, action: PayloadAction<WorkoutModel>) => {
            state.workouts = state.workouts.filter(
                workout => workout._id !== action.payload._id,
            );
        },
        setWorkoutProps: (state, action: PayloadAction<WorkoutProps>) => {
            if (action.payload.detailWorkout) {
                state.detailWorkout = action.payload.detailWorkout;
            }
            if (action.payload.workoutSessionDetail) {
                state.workoutSessionDetail =
                    action.payload.workoutSessionDetail;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(
            workoutActions.getWorkouts.fulfilled,
            (state, action) => {
                state.workouts = action.payload;
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const workoutSliceActions = workoutSlice.actions;
export const workoutReducer = workoutSlice.reducer;
