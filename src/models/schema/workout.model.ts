import {ExerciseWorkoutModel} from 'src/models/schema/exerciseWorkout.model';

export interface WorkoutModel {
    id: string;
    name: string;
    description?: string;
    exercises: ExerciseWorkoutModel[];
    createdAt: string;
    notes?: string;
}

export interface ReferenceWorkoutModel extends WorkoutModel {
    hasBeenEdit?: boolean;
}
