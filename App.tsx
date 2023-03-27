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

// for disabling warning when passing function to navigation params, but be careful is you use DeepLinking or persisting state
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

function App(): JSX.Element {
    const theme = DARK_THEME;

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
