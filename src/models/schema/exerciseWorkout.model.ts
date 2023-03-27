import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {ExerciseModel} from 'src/models/schema/exercise.model';

export interface ExerciseWorkoutModel {
    id: string;
    description: string;
    exercise: ExerciseModel;
    exerciseSets: ExerciseSetModel[];
}
