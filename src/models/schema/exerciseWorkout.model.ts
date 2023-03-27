import {
    exerciseSetFromSchema,
    ExerciseSetModel,
    ExerciseSetSchema,
} from 'src/models/schema/exerciseSet.model';
import {
    exerciseFromSchema,
    ExerciseModel,
    ExerciseSchema,
} from 'src/models/schema/exercise.model';
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
            exercises: 'Exercise',
            exerciseSets: 'ExerciseSet[]',
        },
    };
}

export const exerciseWorkoutFromSchema = (
    exerciseWorkoutSchema: ExerciseWorkoutSchema,
): ExerciseWorkoutModel => {
    const exerciseWorkout: ExerciseWorkoutModel = {
        id: exerciseWorkoutSchema.id,
        description: exerciseWorkoutSchema.description,
        exercise: exerciseFromSchema(exerciseWorkoutSchema.exercise),
        exerciseSets: exerciseWorkoutSchema.exerciseSets.map(exerciseSet =>
            exerciseSetFromSchema(exerciseSet),
        ),
    };
    return exerciseWorkout;
};
