import {AppRoutes} from 'src/navigation/routes';
import type {RouteProp} from '@react-navigation/native';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppScreenProps} from 'src/navigation/root/app/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type AccountStackParamList = {
    [AppRoutes.ACCOUNT_SCREEN]: undefined;
    [AppRoutes.PROFILE_SCREEN]: undefined;
};

export type AccountRouteProp<T extends keyof AccountStackParamList> = RouteProp<
    AccountStackParamList,
    T
>;
export type AccountNavigationProp<T extends keyof AccountStackParamList> =
    StackNavigationProp<AccountStackParamList, T>;

export type AccountStackNavigationProps<T extends keyof AccountStackParamList> =
    CompositeScreenProps<
        AppScreenProps<AppRoutes.ACCOUNT_STACK>,
        StackScreenProps<AccountStackParamList, T>
    >['navigation'];
