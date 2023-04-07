import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';

const orderWorkoutSessionsByDate = (workoutSessions: WorkoutSessionModel[]) => {
    const orderedWorkouts = workoutSessions.sort((a, b) => {
        // DESC order
        return a.createdAt > b.createdAt ? -1 : 1;
    });

    return orderedWorkouts;
};

export const workoutSessionsUtils = {
    orderWorkoutSessionsByDate,
};
