import {AppRoutes} from 'src/navigation/routes';
import {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';
import {HomeStackParamList} from 'src/navigation/stacks/home/types';
import {WorkoutStackParamList} from 'src/navigation/stacks/workout/types';
import {ExercisesStackParamList} from 'src/navigation/stacks/exercises/types';
import {AccountStackParamList} from 'src/navigation/stacks/account/types';
import {TabParamList} from 'src/navigation/root/tabs/types';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
    RootStackParamList,
    RootStackScreenProps,
} from 'src/navigation/root/types';
import {AnalysisStackParamList} from 'src/navigation/stacks/analysis/types';

export type AppParamList = {
    [AppRoutes.TABS]: NavigatorScreenParams<TabParamList>;
    [AppRoutes.HOME_STACK]: NavigatorScreenParams<HomeStackParamList>;
    [AppRoutes.WORKOUTS_STACK]: NavigatorScreenParams<WorkoutStackParamList>;
    [AppRoutes.EXERCISES_STACK]: NavigatorScreenParams<ExercisesStackParamList>;
    [AppRoutes.ACCOUNT_STACK]: NavigatorScreenParams<AccountStackParamList>;
    [AppRoutes.ANALYSIS_STACK]: NavigatorScreenParams<AnalysisStackParamList>;
};

export type AppScreenProps<T extends keyof AppParamList> = CompositeScreenProps<
    BottomTabScreenProps<AppParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;
