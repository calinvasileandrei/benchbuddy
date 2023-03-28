import React from 'react';
import {View} from 'react-native';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {loginStyle} from 'src/screens/auth/login/login.style';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {Logger} from 'src/utils/logger';
import {AuthService} from 'src/services/auth/auth.service';
import {Text} from '@rneui/themed';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const logger = new Logger('LoginScreen');

const LoginScreen = () => {
    const style = useThemeStyle(loginStyle);

    GoogleSignin.configure({
        webClientId:
            '589928693522-qds08l9s2t9r6pn9918ef0k6f9h0giei.apps.googleusercontent.com',
        offlineAccess: false,
    });

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();
        if (idToken) {
            AuthService.handleLoginWithGoogle(idToken);
        }
    }

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <View style={style.container}>
                <Text style={style.logoText}> Gym Tren </Text>
                <MyButton
                    type={'primary'}
                    onPress={() => onGoogleButtonPress()}>
                    Join GymTren
                </MyButton>
            </View>
        </MySafeAreaView>
    );
};

export default LoginScreen;
