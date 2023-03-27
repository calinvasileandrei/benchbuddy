import {AppRoutes} from 'src/navigation/routes';
import type {CompositeScreenProps, RouteProp} from '@react-navigation/native';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {ExerciseModel} from 'src/models/schema/exercise.model';
import {AppScreenProps} from 'src/navigation/root/app/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type WorkoutStackParamList = {
    [AppRoutes.WORKOUTS_SCREEN]: undefined,
    [AppRoutes.WORKOUT_DETAIL_SCREEN]: undefined,
    [AppRoutes.WORKOUT_EDIT_SCREEN]: undefined,
    [AppRoutes.WORKOUT_CREATION_SCREEN]: undefined,
    [AppRoutes.WORKOUT_SESSION_CREATION_SCREEN]: undefined,
    [AppRoutes.WORKOUT_SESSION_EDIT]: undefined,
    [AppRoutes.WORKOUT_SESSION_DETAILS]: { workoutSessionId: string }
    [AppRoutes.WORKOUT_SELECTION_SCREEN]: { setWorkout: (workout: WorkoutModel) => void },
    [AppRoutes.EXERCISES_SELECTION_SCREEN]: { setExercises: (exercises: ExerciseModel) => void },


}

export type WorkoutRouteProp<T extends keyof WorkoutStackParamList> = RouteProp<WorkoutStackParamList, T>
export type WorkoutNavigationProp<T extends keyof WorkoutStackParamList> = StackNavigationProp<WorkoutStackParamList, T>

export type WorkoutStackNavigationProps<T extends keyof WorkoutStackParamList> =
    CompositeScreenProps<
        AppScreenProps<AppRoutes.WORKOUTS_STACK>,
        StackScreenProps<WorkoutStackParamList, T>
    >['navigation'];
