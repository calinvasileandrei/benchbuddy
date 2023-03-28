import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';

const isInitialSet = (set: ExerciseSetModel): boolean => {
    if (set.weight === 0 && set.reps === 0 && set.rest === 0) {
        return true;
    }
    return false;
};

export const exerciseUtils = {
    isInitialSet,
};
