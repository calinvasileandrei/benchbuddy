import {User} from 'firebase/auth';
import {WorkoutModel} from 'src/models/schema/workout.model';

export interface UserModel {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    creationTime: string;
    providerId: string;
    workouts: WorkoutModel[];
    workoutsSessions: string[]
}


export const getUserModelFromFirebaseUser = (user: User): UserModel => {
    const userModel: UserModel = {
        uid: user.uid,
        email: user?.email || '',
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || '',
        phoneNumber: user?.phoneNumber || '',
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        creationTime: user.metadata.creationTime || '',
        providerId: user.providerId,
        workouts: [],
        workoutsSessions: []
    }
    return userModel;
}
