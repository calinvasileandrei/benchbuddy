import React from 'react';
import {AppRoutes} from 'src/navigation/routes';
import {AccountStack} from 'src/navigation/stacks/account/account.stack';
import {ExercisesStack} from 'src/navigation/stacks/exercises/exercises.stack';
import {WorkoutStack} from 'src/navigation/stacks/workout/workout.stack';
import {HomeStack} from 'src/navigation/stacks/home/home.stack';
import {TabsNavigator} from 'src/navigation/root/tabs/tabs.navigator';
import {AppParamList} from 'src/navigation/root/app/types';
import {createStackNavigator} from '@react-navigation/stack';
import {AnalysisStack} from 'src/navigation/stacks/analysis/analysis.stack';

const Stack = createStackNavigator<AppParamList>();

export const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={AppRoutes.TABS} component={TabsNavigator} />
            <Stack.Screen name={AppRoutes.HOME_STACK} component={HomeStack} />
            <Stack.Screen
                name={AppRoutes.WORKOUTS_STACK}
                component={WorkoutStack}
            />
            <Stack.Screen
                name={AppRoutes.EXERCISES_STACK}
                component={ExercisesStack}
            />
            <Stack.Screen
                name={AppRoutes.ACCOUNT_STACK}
                component={AccountStack}
            />
            <Stack.Screen
                name={AppRoutes.ANALYSIS_STACK}
                component={AnalysisStack}
            />
        </Stack.Navigator>
    );
};
