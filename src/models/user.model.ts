import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Realm from 'realm';

export interface UserModel {
    id: string;
    email: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
    creationTime: string;
    /*    workouts: WorkoutModel[];
    workoutsSessions: string[];*/
}

export class UserSchema extends Realm.Object<UserModel> {
    id!: string;
    email!: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    creationTime!: string;
    static schema = {
        name: 'User',
        properties: {
            id: 'string',
            email: 'string',
            displayName: 'string?',
            photoURL: 'string',
            phoneNumber: 'string?',
            creationTime: 'string',
        },
        primaryKey: 'id',
    };
}

export const getUserModelFromFirebaseUser = (
    user: UserAuthModel,
): UserModel => {
    const userModel: UserModel = {
        id: user.uid,
        email: user?.email || '',
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || '',
        phoneNumber: user?.phoneNumber || '',
        creationTime: user.metadata.creationTime || '',
    };
    return userModel;
};
export type UserAuthModel = FirebaseAuthTypes.User;
