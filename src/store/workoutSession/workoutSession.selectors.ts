import {RootState} from 'src/store/store';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {ExerciseWorkoutModel} from 'src/models/schema/exerciseWorkout.model';

const getSession = (state: RootState): WorkoutSessionModel | undefined => {
    return state.workoutSession.workoutSession;
};

const getCurrentExerciseSession = (
    state: RootState,
    exerciseId: string,
): ExerciseWorkoutModel | undefined => {
    if (
        state.workoutSession.workoutSession === undefined ||
        state.workoutSession.workoutSession.sessionExercises.length == 0
    ) {
        return;
    }
    return state.workoutSession.workoutSession?.sessionExercises.find(
        exercise => exercise.id === exerciseId,
    );
};

const getStore = (state: RootState) => {
    return state.workoutSession;
};

const getCreatedAt = (state: RootState): Date => {
    // get Date from string
    return state.workoutSession.createdAt;
};

export const workoutSessionSelectors = {
    getSession,
    getCurrentExerciseSession,
    getStore,
    getCreatedAt,
};
