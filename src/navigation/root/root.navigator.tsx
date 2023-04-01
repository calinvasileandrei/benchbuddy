import {FC} from 'react';
import {RootRoutes} from 'src/navigation/routes';
import {AppStack} from 'src/navigation/root/app/app.stack';
import {RootStackParamList} from 'src/navigation/root/types';
import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator<RootStackParamList>();

interface RootNavigatorProps {}

export const RootNavigator: FC<RootNavigatorProps> = props => {
    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name={RootRoutes.APP} component={AppStack} />
            {/*      <RootStack.Screen
                name={RootRoutes.AUTHENTICATION}
                component={AuthenticationStack}
            />*/}
        </RootStack.Navigator>
    );
};
