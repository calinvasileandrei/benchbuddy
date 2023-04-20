import {AppRoutes} from 'src/navigation/routes';
import type {RouteProp} from '@react-navigation/native';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppScreenProps} from 'src/navigation/root/app/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type AnalysisStackParamList = {
    [AppRoutes.ANALYSIS_SCREEN]: undefined;
};

export type AnalysisRouteProp<T extends keyof AnalysisStackParamList> =
    RouteProp<AnalysisStackParamList, T>;
export type AnalysisNavigationProp<T extends keyof AnalysisStackParamList> =
    StackNavigationProp<AnalysisStackParamList, T>;

export type AnalysisStackNavigationProps<
    T extends keyof AnalysisStackParamList,
> = CompositeScreenProps<
    AppScreenProps<AppRoutes.ANALYSIS_STACK>,
    StackScreenProps<AnalysisStackParamList, T>
>['navigation'];
