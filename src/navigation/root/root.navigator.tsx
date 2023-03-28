import {FC} from 'react';
import {RootRoutes} from 'src/navigation/routes';
import {AuthenticationStack} from 'src/navigation/stacks/authentication/authentication.stack';
import {useAuth} from 'src/hooks/useAuth.hook';
import {AppStack} from 'src/navigation/root/app/app.stack';
import {RootStackParamList} from 'src/navigation/root/types';
import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator<RootStackParamList>();

interface RootNavigatorProps {}

export const RootNavigator: FC<RootNavigatorProps> = props => {
    const {user} = useAuth();
    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            {user ? (
                <RootStack.Screen name={RootRoutes.APP} component={AppStack} />
            ) : (
                <RootStack.Screen
                    name={RootRoutes.AUTHENTICATION}
                    component={AuthenticationStack}
                />
            )}
        </RootStack.Navigator>
    );
};
