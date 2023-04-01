import Realm from 'realm';
import {
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
    ownerId: string;
    hasBeenEdit?: boolean;
}

export class WorkoutSchema extends Realm.Object<WorkoutModel> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    description?: string;
    createdAt!: string;
    notes?: string;
    ownerId!: string;
    exercises!: Realm.List<ExerciseWorkoutSchema>;
    static schema = {
        name: 'Workout',
        properties: {
            _id: 'objectId',
            name: 'string',
            description: 'string?',
            createdAt: 'string',
            notes: 'string?',
            ownerId: 'string',
            exercises: 'ExerciseWorkout[]',
        },
        primaryKey: '_id',
    };
}
