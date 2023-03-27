import React from 'react';
import {AuthenticationRoutes} from 'src/navigation/routes';
import {AuthenticationStackParamList} from 'src/navigation/stacks/authentication/types';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'src/screens/auth/login/login.screen';

const Stack = createStackNavigator<AuthenticationStackParamList>();

export const AuthenticationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={AuthenticationRoutes.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
