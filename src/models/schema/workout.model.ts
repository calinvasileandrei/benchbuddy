import Realm from 'realm';
import {
    ExerciseWorkoutModel,
    ExerciseWorkoutSchema,
} from 'src/models/schema/exerciseWorkout.model';
import {RealmCollections} from 'src/models/schema/realmTypes';

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

export class WorkoutSchema extends Realm.Object<WorkoutSchema> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    description?: string;
    createdAt!: string;
    notes?: string;
    ownerId!: string;
    exercises!: Realm.List<ExerciseWorkoutSchema>;
    static schema = {
        name: RealmCollections.WORKOUT,
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
