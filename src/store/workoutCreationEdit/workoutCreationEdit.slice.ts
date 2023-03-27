import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {Logger} from 'src/utils/logger';
import Realm from 'realm';

const logger = new Logger('workoutCreationEdit.slice');

export interface WorkoutCreationEditState {
    workout?: WorkoutModel;
}

const workoutDefault: WorkoutModel = {
    _id: new Realm.BSON.ObjectID(),
    name: '',
    description: '',
    notes: '',
    exercises: [],
    createdAt: new Date().toDateString(),
};

const initialState: WorkoutCreationEditState = {};

export const workoutCreationEditSlice = createSlice({
    name: 'workoutCreationEdit',
    initialState,
    reducers: {
        saveWorkout: (state, action: PayloadAction<WorkoutModel>) => {
            state.workout = action.payload;
        },
        editWorkout: (state, action: PayloadAction<Partial<WorkoutModel>>) => {
            state.workout = {
                ...workoutDefault,
                ...state.workout,
                ...action.payload,
            };
        },
        deleteWorkout: (state, action: PayloadAction<void>) => {
            state.workout = undefined;
        },
        saveExerciseSet: (
            state,
            action: PayloadAction<{
                sessionExerciseId: string;
                exerciseSets: ExerciseSetModel[];
            }>,
        ) => {
            const {sessionExerciseId, exerciseSets} = action.payload;
            if (state.workout) {
                const index = state.workout?.exercises.findIndex(
                    exerciseWorkout => exerciseWorkout.id === sessionExerciseId,
                );
                if (index === -1) {
                    logger.debug(
                        'Exercise not found in the list, nothing to update',
                    );
                    return;
                }
                const exerciseWorkout = [...state.workout?.exercises];
                exerciseWorkout[index] = {
                    ...state.workout.exercises[index],
                    exerciseSets,
                };
                state.workout.exercises = exerciseWorkout;
            }
        },
        deleteExercise: (state, action: PayloadAction<string>) => {
            const exerciseId = action.payload;
            if (state.workout?.exercises) {
                const index = state.workout?.exercises.findIndex(
                    exerciseWorkout =>
                        exerciseWorkout.exercise.id === exerciseId,
                );
                const exerciseWorkout = state.workout?.exercises;
                exerciseWorkout.splice(index, 1);
                state.workout.exercises = exerciseWorkout;
            }
        },
    },
    extraReducers: builder => {},
});

// Action creators are generated for each case reducer function
export const workoutCreationEditSliceActions = workoutCreationEditSlice.actions;
export const workoutCreationEditReducer = workoutCreationEditSlice.reducer;
