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
import {UserModel} from 'src/models/user.model';
import {useRealmUser} from 'src/hooks/realm/useRealmUser.hook';

const logger = new Logger('LoginScreen');

const LoginScreen = () => {
    const style = useThemeStyle(loginStyle);
    const app = useApp();
    const realmUserHook = useRealmUser();

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
                const newUser: UserModel = {
                    id: userMongo.id,
                    phoneNumber: '',
                    email: userMongo.profile.email || '',
                    creationTime: '',
                    photoURL: userMongo.profile.pictureUrl || '',
                    displayName: userMongo.profile.name || '',
                };
                return realmUserHook.registerUser(newUser);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
        // show error
    };

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <View style={style.container}>
                <Text style={style.logoText}> Gym Tren </Text>
                <MyButton type={'primary'} onPress={() => signIn()}>
                    Join GymTren
                </MyButton>
            </View>
        </MySafeAreaView>
    );
};

export default LoginScreen;
