import Realm from 'realm';

export interface ExerciseSetModel {
    setNumber: number;
    reps: number;
    weight: number;
    rest: number;
    isWarmup: boolean;
}

export class ExerciseSetSchema extends Realm.Object<ExerciseSetModel> {
    setNumber!: number;
    reps!: number;
    weight!: number;
    rest!: number;
    isWarmup!: boolean;
    static schema = {
        name: 'ExerciseSet',
        embedded: true,
        properties: {
            setNumber: 'int',
            reps: 'int',
            weight: 'int',
            rest: 'int',
            isWarmup: 'bool',
        },
    };
}

export const exerciseSetFromSchema = (
    exerciseSetSchema: ExerciseSetSchema,
): ExerciseSetModel => {
    const exerciseSet: ExerciseSetModel = {
        setNumber: exerciseSetSchema.setNumber,
        reps: exerciseSetSchema.reps,
        weight: exerciseSetSchema.weight,
        rest: exerciseSetSchema.rest,
        isWarmup: exerciseSetSchema.isWarmup,
    };
    return exerciseSet;
};
