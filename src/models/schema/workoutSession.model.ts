import {
    ExerciseWorkoutModel,
    ExerciseWorkoutSchema,
} from 'src/models/schema/exerciseWorkout.model';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import Realm from 'realm';

export interface WorkoutSessionModel {
    id: string;
    referenceWorkout: WorkoutModel;
    sessionExercises: ExerciseWorkoutModel[];
    notes?: string;
    duration: string;
    createdAt: string;
    ownerId: string;
}

export class WorkoutSessionSchema extends Realm.Object<WorkoutSessionSchema> {
    id!: Realm.BSON.ObjectId;
    referenceWorkout!: WorkoutSchema;
    sessionExercises!: Realm.List<ExerciseWorkoutSchema>;
    notes?: string;
    duration!: string;
    createdAt!: string;
    owner!: string;
    static schema = {
        name: 'WorkoutSession',
        properties: {
            id: 'objectId',
            referenceWorkout: 'Workout',
            sessionExercises: 'ExerciseWorkout[]',
            notes: 'string?',
            createdAt: 'string',
            ownerId: 'string',
        },
        primaryKey: 'id',
    };
}
