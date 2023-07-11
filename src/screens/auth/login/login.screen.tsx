import React, {useEffect} from 'react'
import {KeyboardAvoidingView, Platform, View} from 'react-native'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {loginStyle} from 'src/screens/auth/login/login.style'
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component'
import {Logger} from 'src/utils/logger'
import {Divider, Image, Text} from '@rneui/themed'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {useApp} from '@realm/react'
import Realm from 'realm'
import {useAppDispatch} from 'src/store/store'
import {userSliceActions} from 'src/store/user/user.slice'
import {userUtils} from 'src/utils/user.utils'
import {showToastable} from 'react-native-toastable'
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {RealmCollections, RealmDB} from 'src/models/schema/realmTypes'
import {UserModel} from 'src/models/user.model'

const logger = new Logger('LoginScreen')
const logoImage = require('assets/logo.png')

const LoginScreen = () => {
    const style = useThemeStyle(loginStyle)
    const app = useApp()
    const dispatch = useAppDispatch()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '589928693522-44rsu6g646qgj2sq3khskcsal4b3nn3b.apps.googleusercontent.com',
            offlineAccess: true
        })
    }, [])

    const initUser = async (userMongo: Realm.User) => {
        // access mongo client db
        const mongoClient = userMongo.mongoClient('mongodb-atlas')
        // access mongo collection
        const usersCollection = mongoClient?.db(RealmDB.DB_NAME).collection(RealmCollections.USER)
        // find user in collection
        const userFromMongoAuth = await usersCollection?.findOne({
            _id: userMongo.id
        })
        logger.debug('User from mongo auth', userFromMongoAuth)

        // if user not found, create new user
        if (!userFromMongoAuth) {
            const user = userUtils.mongoUserToModel(userMongo)
            const newUser = await usersCollection?.insertOne(user)
            logger.debug('New user created', newUser)
            return user
        }

        return userFromMongoAuth as UserModel
    }

    const signIn = async () => {
        try {
            // Sign in with Google
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            // Authenticate with MongoDB Realm
            if (userInfo.idToken) {
                // Google auth problems, using jwt generated from google
                // https://github.com/realm/realm-js/issues/4995
                const credentials = Realm.Credentials.jwt(userInfo.idToken)
                const userMongo = await app.logIn(credentials)
                // init user in mongodb
                const user = await initUser(userMongo)
                //save user in redux
                dispatch(userSliceActions.saveUser(user))
                logger.debug('User logged in', user)
            }
        } catch (error) {
            logger.error('Error signing in:', error)
            showToastable({
                title: 'Error signing in',
                message: 'An error occurred while signing in. Please try again.',
                status: 'danger'
            })
        }
    }

    return (
        <MySafeAreaView edges={['top']}>
            <View style={style.container}>
                <View>
                    <View style={style.titleContainer}>
                        <Text style={style.logoText}> BenchBuddy </Text>
                    </View>
                    <View style={style.imageContainer}>
                        <Image source={logoImage} style={style.image} />
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={style.formContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <MyInput placeholder={'Email'} />
                    <MyInput placeholder={'Password'} />
                    <MyButton type={'outline'} textColor={'light'} onPress={() => signIn()}>
                        Login
                    </MyButton>
                    <View style={style.dividerContainer}>
                        <Divider style={style.divider} />
                        <MyText type={'captionText'}>or</MyText>
                        <Divider style={style.divider} />
                    </View>
                    <MyButton type={'outline'} textColor={'light'} onPress={() => signIn()}>
                        Login with Google
                    </MyButton>
                </KeyboardAvoidingView>
            </View>
        </MySafeAreaView>
    )
}

export default LoginScreen
