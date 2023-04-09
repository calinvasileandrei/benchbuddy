import React from 'react';
import {AppRoutes} from 'src/navigation/routes';
import {WorkoutDetailScreen} from 'src/screens/app/workout/screens/workoutDetail/workoutDetail.screen';
import {WorkoutCreationScreen} from 'src/screens/app/workout/screens/workoutCreation/workoutCreation.screen';
import {WorkoutScreen} from 'src/screens/app/workout/workout.screen';
import {WorkoutStackParamList} from 'src/navigation/stacks/workout/types';
import {WorkoutSessionCreationScreen} from 'src/screens/app/workout/screens/workoutSessionCreation/workoutSessionCreation.screen';
import {WorkoutSelectionScreen} from 'src/screens/app/workout/screens/workoutSelection/workoutSelection.screen';
import {WorkoutSessionDetailsScreen} from 'src/screens/app/workout/screens/workoutSessionDetails/workoutSessionDetails.screen';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {headerStyle} from 'src/navigation/stacks/headerStyle';
import {useNavigation} from '@react-navigation/native';
import {ExerciseSelectionScreen} from 'src/screens/app/exercises/screens/exerciseSelection/exerciseSelection.screen';
import {MenuMoreButton} from 'src/navigation/components/menuMoreButton/menuMoreButton.component';
import {WorkoutEditScreen} from 'src/screens/app/workout/screens/workoutEdit/workoutEdit.screen';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {workoutSelectors} from 'src/store/workout/workout.selectors';
import {WorkoutSessionEditScreen} from 'src/screens/app/workout/screens/workoutSessionEdit/workoutSessionEdit.screen';
import {workoutSessionSliceActions} from 'src/store/workoutSession/workoutSession.slice';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import {GoBack} from 'src/navigation/components/goBack/goBack.component';
import {myLoadingActions} from 'src/store/myLoading/myLoading.slice';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {useRealmWorkouts} from 'src/hooks/realm/useRealmWorkouts.hook';
import {useRealmWorkoutSession} from 'src/hooks/realm/useRealmWorkoutSession.hook';

const Stack = createStackNavigator<WorkoutStackParamList>();

export const WorkoutStack = () => {
    const style = useThemeStyle(headerStyle);
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const workout = useAppSelector(workoutSelectors.getDetailWorkout);
    const workoutSession = useAppSelector(
        workoutSelectors.getWorkoutSessionDetail,
    );
    const realmWorkouts = useRealmWorkouts();
    const realmWorkoutSessions = useRealmWorkoutSession();

    const getOptions = (title: string): StackNavigationOptions => {
        return {
            headerShown: true,
            headerStyle: style.header,
            headerShadowVisible: false, // Removes bottom shadow
            title: title,
            headerTitleStyle: style.headerTitle,
            headerLeft: () => <GoBack />,
        };
    };

    const getWorkoutSessionCreationOptions = (
        title: string,
    ): StackNavigationOptions => {
        const handleSelectWorkoutTemplate = () => {
            const setWorkout = (workoutToInit: WorkoutModel) => {
                dispatch(workoutSessionSliceActions.initSession(workoutToInit));
            };

            navigation.navigate(AppRoutes.WORKOUTS_STACK, {
                screen: AppRoutes.WORKOUT_SELECTION_SCREEN,
                params: {setWorkout},
            });
        };
        return {
            ...getOptions(title),
            headerRight: () => (
                <MenuMoreButton
                    options={[
                        {
                            title: 'Select Workout template',
                            iconName: 'add-circle-outline',
                            onPress: handleSelectWorkoutTemplate,
                        },
                    ]}
                />
            ),
        };
    };

    const getWorkoutDetailOptions = (title: string): StackNavigationOptions => {
        const handleDelete = async () => {
            if (workout) {
                dispatch(myLoadingActions.show(true));
                realmWorkouts.deleteItem(workout._id);
                dispatch(myLoadingActions.show(false));
            }
            navigation.goBack();
        };
        return {
            ...getOptions(title),
            headerRight: () => (
                <MenuMoreButton
                    options={[
                        {
                            title: 'Edit',
                            iconName: 'create-outline',
                            onPress: () =>
                                navigation.navigate(
                                    AppRoutes.WORKOUT_EDIT_SCREEN,
                                ),
                        },
                        {
                            title: 'Delete',
                            iconName: 'trash-outline',
                            onPress: () => handleDelete(),
                        },
                    ]}
                />
            ),
        };
    };

    const getWorkoutSessionDetailOptions = (
        title: string,
    ): StackNavigationOptions => {
        const handleDelete = async () => {
            if (workoutSession) {
                dispatch(myLoadingActions.show(true));
                realmWorkoutSessions.deleteItem(workoutSession._id);
                dispatch(workoutSessionSliceActions.clearSession());
                dispatch(myLoadingActions.show(false));
            }
            navigation.goBack();
        };
        const handleEdit = () => {
            if (!workoutSession) {
                return;
            }
            dispatch(workoutSessionSliceActions.loadSession(workoutSession));
            navigation.navigate(AppRoutes.WORKOUT_SESSION_EDIT);
        };
        return {
            ...getOptions(title),
            headerRight: () => (
                <MenuMoreButton
                    options={[
                        {
                            title: 'Edit',
                            iconName: 'create-outline',
                            onPress: () => handleEdit(),
                        },
                        {
                            title: 'Delete',
                            iconName: 'trash-outline',
                            onPress: () => handleDelete(),
                        },
                    ]}
                />
            ),
        };
    };

    const getWorkoutSessionEditOptions = (
        title: string,
    ): StackNavigationOptions => {
        return {
            ...getOptions(title),
        };
    };

    const getModalOptions = (title: string): StackNavigationOptions => {
        return {
            headerShown: true,
            headerStyle: style.modalHeader,
            headerShadowVisible: false, // Removes bottom shadow
            title: title,
            headerTitleStyle: style.headerTitle,
            presentation: 'modal',
            headerLeft: () => <GoBack />,
        };
    };

    const getWorkoutCreationOptions = (
        title: string,
    ): StackNavigationOptions => {
        return {
            ...getOptions(title),
        };
    };
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name={AppRoutes.WORKOUTS_SCREEN}
                component={WorkoutScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_DETAIL_SCREEN}
                options={getWorkoutDetailOptions('Workout Details')}
                component={WorkoutDetailScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_EDIT_SCREEN}
                options={getOptions('Workout Edit')}
                component={WorkoutEditScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_CREATION_SCREEN}
                options={getWorkoutCreationOptions('Workout Creation')}
                component={WorkoutCreationScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_SESSION_CREATION_SCREEN}
                options={getWorkoutSessionCreationOptions(
                    'Workout Session Creation',
                )}
                component={WorkoutSessionCreationScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_SELECTION_SCREEN}
                options={getModalOptions('Your Workouts')}
                component={WorkoutSelectionScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_SESSION_DETAILS}
                options={getWorkoutSessionDetailOptions(
                    'Workout Session Details',
                )}
                component={WorkoutSessionDetailsScreen}
            />

            <Stack.Screen
                name={AppRoutes.WORKOUT_SESSION_EDIT}
                options={getWorkoutSessionEditOptions('Workout Session Edit')}
                component={WorkoutSessionEditScreen}
            />

            <Stack.Screen
                name={AppRoutes.EXERCISES_SELECTION_SCREEN}
                options={getModalOptions('Exercise Selection')}
                component={ExerciseSelectionScreen}
            />
        </Stack.Navigator>
    );
};
