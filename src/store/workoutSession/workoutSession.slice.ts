import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {firestoreUtils} from 'src/utils/firestore.utils';
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {ExerciseWorkoutModel} from 'src/models/schema/exerciseWorkout.model';
import {Logger} from 'src/utils/logger';
import {ExerciseModel} from 'src/models/schema/exercise.model';

const logger = new Logger('workoutSession.slice');

export interface WorkoutSessionState {
    workoutSession?: WorkoutSessionModel;
    notes?: string;
    createdAt: Date;
}

const initialState: WorkoutSessionState = {
    createdAt: new Date(),
};

export const workoutSessionSlice = createSlice({
    name: 'workoutSession',
    initialState,
    reducers: {
        initSession: (state, action: PayloadAction<WorkoutModel>) => {
            const workout = action.payload;
            const sessionExercises = workout.exercises.map(
                (exerciseTemp, index): ExerciseWorkoutModel => {
                    return {
                        id: index.toString(),
                        exercise: exerciseTemp.exercise,
                        exerciseSets: [...exerciseTemp.exerciseSets],
                        description: exerciseTemp.description,
                    };
                },
            );
            state.workoutSession = {
                id: firestoreUtils.autoId(),
                ownerId: '',
                referenceWorkout: workout,
                notes: undefined,
                sessionExercises: sessionExercises,
                duration: '0',
                createdAt: new Date().toDateString(),
            };
        },
        setNotes: (state, action: PayloadAction<string>) => {
            state.notes = action.payload;
        },
        saveExerciseSet: (
            state,
            action: PayloadAction<{
                sessionExerciseId: string;
                exerciseSets: ExerciseSetModel[];
            }>,
        ) => {
            const {sessionExerciseId, exerciseSets} = action.payload;
            if (state.workoutSession) {
                // find the exercise in the list
                const index = state.workoutSession?.sessionExercises.findIndex(
                    exerciseWorkout =>
                        exerciseWorkout?.id === sessionExerciseId,
                );
                if (index === -1) {
                    logger.debug(
                        'Exercise not found in the list, nothing to update',
                    );
                    return;
                }
                // update the exercise in the list
                const exercisesWorkout = [
                    ...state.workoutSession?.sessionExercises,
                ];
                exercisesWorkout[index] = {
                    ...state.workoutSession?.sessionExercises[index],
                    exerciseSets,
                };
                state.workoutSession.sessionExercises = exercisesWorkout;
            }
        },
        saveDate: (state, action: PayloadAction<Date>) => {
            state.createdAt = action.payload;
        },
        clearSession: (state, action: PayloadAction<void>) => {
            state.workoutSession = undefined;
            state.notes = undefined;
        },
        loadSession: (state, action: PayloadAction<WorkoutSessionModel>) => {
            state.workoutSession = action.payload;
            state.notes = action.payload.notes;
        },
        addExtraExercise: (state, action: PayloadAction<ExerciseModel>) => {
            if (state.workoutSession) {
                const newExercise: ExerciseWorkoutModel = {
                    id: state.workoutSession.referenceWorkout.exercises.length.toString(),
                    exercise: action.payload,
                    exerciseSets: [
                        {
                            reps: 0,
                            weight: 0,
                            setNumber: 0,
                            isWarmup: false,
                            rest: 0,
                        },
                    ],
                    description: '',
                };
                state.workoutSession.referenceWorkout.exercises = [
                    ...state.workoutSession.referenceWorkout.exercises,
                    newExercise,
                ];
                // creating the reference to the exercise in the session
                state.workoutSession.sessionExercises = [
                    ...state.workoutSession.sessionExercises,
                    newExercise,
                ];
                state.workoutSession.referenceWorkout.hasBeenEdit = true;
            }
        },
    },
    extraReducers: builder => {},
});

// Action creators are generated for each case reducer function
export const workoutSessionSliceActions = workoutSessionSlice.actions;
export const workoutSessionReducer = workoutSessionSlice.reducer;
