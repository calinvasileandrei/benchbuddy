import React from 'react';
import {AppRoutes} from 'src/navigation/routes';
import {HomeScreen} from 'src/screens/app/home/home.screen';
import {HomeStackParamList} from 'src/navigation/stacks/home/types';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<HomeStackParamList>()

export const HomeStack = () => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={AppRoutes.HOME_SCREEN} component={HomeScreen}/>
        </Stack.Navigator>
    )
}
