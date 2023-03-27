import {ExerciseWorkoutModel} from 'src/models/schema/exerciseWorkout.model';
import {ReferenceWorkoutModel} from 'src/models/schema/workout.model';

export interface WorkoutSessionModel {
    id: string;
    referenceWorkout: ReferenceWorkoutModel;
    sessionExercises: ExerciseWorkoutModel[];
    notes?: string;
    duration: string;
    createdAt: string;
    userId: string;
}
