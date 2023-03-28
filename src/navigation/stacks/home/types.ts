import {AppRoutes} from 'src/navigation/routes';
import type {RouteProp} from '@react-navigation/native';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppScreenProps} from 'src/navigation/root/app/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type HomeStackParamList = {
    [AppRoutes.HOME_SCREEN]: undefined;
};

export type HomeRouteProp<T extends keyof HomeStackParamList> = RouteProp<
    HomeStackParamList,
    T
>;
export type HomeNavigationProp<T extends keyof HomeStackParamList> =
    StackNavigationProp<HomeStackParamList, T>;

export type HomeStackNavigationProps<T extends keyof HomeStackParamList> =
    CompositeScreenProps<
        AppScreenProps<AppRoutes.HOME_STACK>,
        StackScreenProps<HomeStackParamList, T>
    >['navigation'];
