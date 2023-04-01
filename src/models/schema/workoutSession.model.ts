import {
    ExerciseWorkoutModel,
    ExerciseWorkoutSchema,
} from 'src/models/schema/exerciseWorkout.model';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import Realm from 'realm';
import {UserSchema} from 'src/models/user.model';

export interface WorkoutSessionModel {
    id: string;
    referenceWorkout: WorkoutModel;
    sessionExercises: ExerciseWorkoutModel[];
    notes?: string;
    duration: string;
    createdAt: string;
    owner: string;
}

export class WorkoutSessionSchema extends Realm.Object<WorkoutSessionModel> {
    id!: Realm.BSON.ObjectId;
    referenceWorkout!: WorkoutSchema;
    sessionExercises!: Realm.List<ExerciseWorkoutSchema>;
    notes?: string;
    duration!: string;
    createdAt!: string;
    owner!: UserSchema;
    static schema = {
        name: 'WorkoutSession',
        properties: {
            id: 'objectId',
            referenceWorkout: 'Workout',
            sessionExercises: 'ExerciseWorkout[]',
            notes: 'string?',
            createdAt: 'string',
            owner: 'User',
        },
        primaryKey: 'id',
    };
}
