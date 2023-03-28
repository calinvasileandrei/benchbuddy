import {RootRoutes} from 'src/navigation/routes';
import {NavigatorScreenParams} from '@react-navigation/native';
import {AuthenticationStackParamList} from 'src/navigation/stacks/authentication/types';
import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
    [RootRoutes.APP]: NavigatorScreenParams<any>;
    [RootRoutes.AUTHENTICATION]: NavigatorScreenParams<AuthenticationStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

/**
 * This enables useNavigation hook to be typed by default with the root stack navigation props
 */

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
