import Realm from 'realm';
import {
    exerciseWorkoutFromSchema,
    ExerciseWorkoutModel,
    ExerciseWorkoutSchema,
} from 'src/models/schema/exerciseWorkout.model';

export interface WorkoutModel {
    _id: Realm.BSON.ObjectId;
    name: string;
    description?: string;
    exercises: ExerciseWorkoutModel[];
    createdAt: string;
    notes?: string;
}

export interface ReferenceWorkoutModel extends WorkoutModel {
    hasBeenEdit?: boolean;
}

export class WorkoutSchema extends Realm.Object<WorkoutModel> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    description?: string;
    createdAt!: string;
    notes?: string;
    exercises!: Realm.List<ExerciseWorkoutSchema>;
    static schema = {
        name: 'Workout',
        properties: {
            _id: 'objectId',
            name: 'string',
            description: 'string?',
            createdAt: 'string',
            notes: 'string?',
            exercises: 'ExerciseWorkout[]',
        },
        primaryKey: '_id',
    };
}

export const workoutFromSchema = (
    workoutSchema: WorkoutSchema,
): WorkoutModel => {
    const workout: WorkoutModel = {
        _id: workoutSchema._id,
        name: workoutSchema.name,
        description: workoutSchema.description,
        exercises: workoutSchema.exercises.map(exerciseWorkoutFromSchema),
        createdAt: workoutSchema.createdAt,
        notes: workoutSchema.notes,
    };
    return workout;
};
