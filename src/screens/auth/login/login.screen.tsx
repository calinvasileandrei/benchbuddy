import React, {useEffect} from 'react';
import {View} from 'react-native';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginStyle} from 'src/screens/auth/login/login.style';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {Logger} from 'src/utils/logger';
import {Text} from '@rneui/themed';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useApp} from '@realm/react';
import Realm from 'realm';
import {useAppDispatch} from 'src/store/store';
import {userSliceActions} from 'src/store/user/user.slice';
import {userUtils} from 'src/utils/user.utils';
import {showToastable} from 'react-native-toastable';

const logger = new Logger('LoginScreen');

const LoginScreen = () => {
    const style = useThemeStyle(loginStyle);
    const app = useApp();
    const dispatch = useAppDispatch();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '589928693522-44rsu6g646qgj2sq3khskcsal4b3nn3b.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const signIn = async () => {
        try {
            // Sign in with Google
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // Authenticate with MongoDB Realm
            if (userInfo.idToken) {
                // Google auth problems, using jwt generated from google
                // https://github.com/realm/realm-js/issues/4995
                const credentials = Realm.Credentials.jwt(userInfo.idToken);
                const userMongo = await app.logIn(credentials);
                const user = userUtils.mongoUserToModel(userMongo);
                dispatch(userSliceActions.saveUser(user));
                logger.debug('User logged in', user);
            }
        } catch (error) {
            logger.error('Error signing in:', error);
            showToastable({
                title: 'Error signing in',
                message:
                    'An error occurred while signing in. Please try again.',
                status: 'danger',
            });
        }
    };

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <View style={style.container}>
                <Text style={style.logoText}> BenchBuddy </Text>
                <MyButton type={'primary'} onPress={() => signIn()}>
                    Join BenchBuddy
                </MyButton>
            </View>
        </MySafeAreaView>
    );
};

export default LoginScreen;
