import {Logger} from 'src/utils/logger';
import {UserService} from 'src/services/app/user.service';
import auth from '@react-native-firebase/auth';

const logger = new Logger('AuthService');

const handleLoginWithGoogle = async (idToken: string) => {
    logger.debug('login logger');
    try {
        const credential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(credential);
        logger.debug('user', res.user);
        await UserService.saveUser(res.user);
    } catch (error: any) {
        logger.error('error', error.message);
    }
};

const handleLogout = async () => {
    return await auth().signOut();
};

export const AuthService = {
    handleLoginWithGoogle,
    handleLogout,
};
