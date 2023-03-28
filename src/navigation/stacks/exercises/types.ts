import {AppRoutes} from 'src/navigation/routes';
import type {RouteProp} from '@react-navigation/native';
import {CompositeScreenProps} from '@react-navigation/native';
import {ExerciseHitModel} from 'src/models/schema/exercise.model';
import {AppScreenProps} from 'src/navigation/root/app/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type ExercisesStackParamList = {
    [AppRoutes.EXERCISES_SCREEN]: undefined;
    [AppRoutes.EXERCISE_DETAIL_SCREEN]: {exerciseHit: ExerciseHitModel};
};

export type ExerciseRouteProp<T extends keyof ExercisesStackParamList> =
    RouteProp<ExercisesStackParamList, T>;
export type ExerciseNavigationProp<T extends keyof ExercisesStackParamList> =
    StackNavigationProp<ExercisesStackParamList, T>;

export type ExerciseStackNavigationProps<
    T extends keyof ExercisesStackParamList,
> = CompositeScreenProps<
    AppScreenProps<AppRoutes.EXERCISES_STACK>,
    StackScreenProps<ExercisesStackParamList, T>
>['navigation'];
