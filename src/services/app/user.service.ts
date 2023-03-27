import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {
    getUserModelFromFirebaseUser,
    UserAuthModel,
    UserModel,
} from 'src/models/user.model';
import {firebase} from '@react-native-firebase/auth';
import {myFirestoreService} from 'src/services/firestoreService/myFirestore.service';

const logger = new Logger('UserService');

const saveUser = async (user: UserAuthModel) => {
    return await myFirestoreService.setDoc({
        collection: Collections.USERS,
        docId: user.uid,
        data: getUserModelFromFirebaseUser(user),
        methodName: 'saveUser',
    });
};

const getUser = async (
    firestoreUser?: UserAuthModel,
): Promise<UserModel | undefined> => {
    const user = firestoreUser || firebase.auth().currentUser;
    if (user?.uid) {
        return await myFirestoreService.getDoc<UserModel>({
            collection: Collections.USERS,
            docId: user.uid,
            methodName: 'getUser',
        });
    }
};

const getAuthUser = (): UserAuthModel | null => {
    return firebase.auth().currentUser;
};

export const UserService = {
    saveUser,
    getUser,
    getAuthUser,
};
