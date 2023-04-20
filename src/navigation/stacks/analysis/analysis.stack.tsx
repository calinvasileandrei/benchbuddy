import React from 'react';
import {AppRoutes} from 'src/navigation/routes';
import {createStackNavigator} from '@react-navigation/stack';
import {AnalysisStackParamList} from 'src/navigation/stacks/analysis/types';
import {AnalysisScreen} from 'src/screens/app/analysis/analysis.screen';

const Stack = createStackNavigator<AnalysisStackParamList>();

export const AnalysisStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name={AppRoutes.ANALYSIS_SCREEN}
                component={AnalysisScreen}
            />
        </Stack.Navigator>
    );
};
