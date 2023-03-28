import React from 'react';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import tabBarStyle from '../../components/tabBar/tabBar.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {AppRoutes} from 'src/navigation/routes';
import {TabItem} from 'src/navigation/components/tabItem/tabItem.component';
import {TabIcon} from 'src/navigation/components/tabIcon/tabIcon.component';
import {TabParamList} from 'src/navigation/root/tabs/types';
import {AccountScreen} from 'src/screens/app/account/account.screen';
import {ExercisesScreen} from 'src/screens/app/exercises/exercises.screen';
import {WorkoutScreen} from 'src/screens/app/workout/workout.screen';
import {HomeScreen} from 'src/screens/app/home/home.screen';

const Tabs = createBottomTabNavigator<TabParamList>();

export const TabsNavigator = () => {
    const style = useThemeStyle(tabBarStyle);

    const getTabOptions = (
        props: any,
        labelKey: string,
        iconName: string,
    ): BottomTabNavigationOptions => ({
        tabBarLabel: options => (
            <TabItem title={labelKey} focused={options.focused} />
        ),
        tabBarIcon: options => (
            <TabIcon iconName={iconName} focused={options.focused} />
        ),
    });

    const tabBarOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarStyle: {
            ...style.bottomTabNavigator,
        },
    };

    return (
        <Tabs.Navigator screenOptions={tabBarOptions}>
            <Tabs.Screen
                name={AppRoutes.HOME_SCREEN}
                options={props => getTabOptions(props, 'Home', 'home')}
                component={HomeScreen}
            />
            <Tabs.Screen
                name={AppRoutes.WORKOUTS_SCREEN}
                options={props => getTabOptions(props, 'Workout', 'server')}
                component={WorkoutScreen}
            />
            <Tabs.Screen
                name={AppRoutes.EXERCISES_SCREEN}
                options={props => getTabOptions(props, 'Exercises', 'barbell')}
                component={ExercisesScreen}
            />
            <Tabs.Screen
                name={AppRoutes.ACCOUNT_SCREEN}
                options={props => getTabOptions(props, 'Account', 'person')}
                component={AccountScreen}
            />
        </Tabs.Navigator>
    );
};
