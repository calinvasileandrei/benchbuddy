import React from 'react';
import {AppRoutes} from 'src/navigation/routes';
import {AccountScreen} from 'src/screens/app/account/account.screen';
import {AccountStackParamList} from 'src/navigation/stacks/account/types';
import {ProfileScreen} from 'src/screens/app/account/screens/profile/profile.screen';
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import {GoBack} from 'src/navigation/components/goBack/goBack.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {headerStyle} from 'src/navigation/stacks/headerStyle';

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountStack = () => {
    const style = useThemeStyle(headerStyle);

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

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name={AppRoutes.ACCOUNT_SCREEN}
                component={AccountScreen}
            />
            <Stack.Screen
                name={AppRoutes.PROFILE_SCREEN}
                options={getOptions('Profile')}
                component={ProfileScreen}
            />
        </Stack.Navigator>
    );
};
