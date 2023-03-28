/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {LogBox} from 'react-native';
import {RootNavigator} from 'src/navigation/root/root.navigator';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from 'src/store/store';
import {ThemeProvider} from 'src/theme/theme.context';
import {DARK_THEME} from 'src/theme/dark.theme';
import {IsLoadingProvider} from 'src/shared/providers/isLoadingProvider/isLoading.provider';
import {MenuProvider} from 'react-native-popup-menu';
import {MyDialogProvider} from 'src/shared/providers/myDialogProvider/myDialog.provider';
import {AppProvider, UserProvider} from '@realm/react';
import {MONGO_APP_ID} from '@dotenv';
import 'react-native-get-random-values';
import LoginScreen from 'src/screens/auth/login/login.screen'; // Polyfill for Mongo ObjectId

// for disabling warning when passing function to navigation params, but be careful is you use DeepLinking or persisting state
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

function App(): JSX.Element {
    const theme = DARK_THEME;

    return (
        <AppProvider id={MONGO_APP_ID}>
            <Provider store={store}>
                <UserProvider fallback={LoginScreen}>
                    <SafeAreaProvider style={{backgroundColor: '#0B2830'}}>
                        <ThemeProvider initial={theme}>
                            <IsLoadingProvider>
                                <NavigationContainer>
                                    <MenuProvider>
                                        <MyDialogProvider>
                                            <RootNavigator />
                                        </MyDialogProvider>
                                    </MenuProvider>
                                </NavigationContainer>
                            </IsLoadingProvider>
                        </ThemeProvider>
                    </SafeAreaProvider>
                </UserProvider>
            </Provider>
        </AppProvider>
    );
}

export default App;
