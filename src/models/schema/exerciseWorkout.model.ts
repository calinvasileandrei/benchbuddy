import {
    ExerciseSetModel,
    ExerciseSetSchema,
} from 'src/models/schema/exerciseSet.model';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import Realm from 'realm';

export interface ExerciseWorkoutModel {
    id: string;
    description: string;
    exercise: ExerciseModel;
    exerciseSets: ExerciseSetModel[];
}

export class ExerciseWorkoutSchema extends Realm.Object<ExerciseWorkoutModel> {
    id!: string;
    description!: string;
    exercise!: ExerciseSchema;
    exerciseSets!: Realm.List<ExerciseSetSchema>;
    static schema = {
        name: 'ExerciseWorkout',
        embedded: true,
        properties: {
            id: 'string',
            description: 'string?',
            exercise: 'Exercise',
            exerciseSets: 'ExerciseSet[]',
        },
    };
}
