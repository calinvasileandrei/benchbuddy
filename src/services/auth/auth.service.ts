import {Logger} from 'src/utils/logger';

const logger = new Logger('AuthService');

const handleLoginWithGoogle = async (idToken: string) => {
    logger.debug('login logger');
    try {
    } catch (error: any) {
        logger.error('error', error.message);
    }
};

const handleLogout = async () => {};

export const AuthService = {
    handleLoginWithGoogle,
    handleLogout,
};
