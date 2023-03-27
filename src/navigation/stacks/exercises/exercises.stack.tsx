import React from 'react';
import {AppRoutes} from 'src/navigation/routes';
import {ExercisesScreen} from 'src/screens/app/exercises/exercises.screen';
import {ExerciseDetailScreen} from 'src/screens/app/exercises/screens/exerciseDetail/exerciseDetail.screen';
import {ExercisesStackParamList} from 'src/navigation/stacks/exercises/types';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {headerStyle} from 'src/navigation/stacks/headerStyle';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {GoBack} from 'src/navigation/components/goBack/goBack.component';

const Stack = createStackNavigator<ExercisesStackParamList>()

export const ExercisesStack = () => {
    const style = useThemeStyle(headerStyle)

    const getOptions = (title: string): StackNavigationOptions => {
        return {
            headerShown: true,
            headerStyle: style.header,
            headerShadowVisible: false, // Removes bottom shadow
            title: title,
            headerTitleStyle: style.headerTitle,
            headerLeft: () => <GoBack/>,
        }
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={AppRoutes.EXERCISES_SCREEN} component={ExercisesScreen}/>
            <Stack.Screen name={AppRoutes.EXERCISE_DETAIL_SCREEN} options={getOptions('Exercise Detail')}
                          component={ExerciseDetailScreen}/>
        </Stack.Navigator>
    )
}
