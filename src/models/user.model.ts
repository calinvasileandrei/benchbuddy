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
