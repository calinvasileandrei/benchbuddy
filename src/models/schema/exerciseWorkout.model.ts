import {
    ExerciseSetModel,
    ExerciseSetSchema,
} from 'src/models/schema/exerciseSet.model';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';

export interface ExerciseWorkoutModel {
    _id: string;
    description: string;
    exercise: ExerciseModel;
    exerciseSets: ExerciseSetModel[];
}

export class ExerciseWorkoutSchema extends Realm.Object<ExerciseWorkoutSchema> {
    _id!: string;
    description!: string;
    exercise!: ExerciseSchema;
    exerciseSets!: Realm.List<ExerciseSetSchema>;
    static schema = {
        name: RealmCollections.EXERCISE_WORKOUT,
        embedded: true,
        properties: {
            _id: 'string',
            description: 'string?',
            exercise: 'Exercise',
            exerciseSets: 'ExerciseSet[]',
        },
    };
}
