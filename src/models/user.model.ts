import Realm from 'realm';

export interface UserModel {
    _id: string;
    email: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
    creationTime: string;
    // Account data
    name?: string;
    surname?: string;
    birthday?: string;
    height?: number;
    weight?: number;
    unit?: string;
}

export class UserSchema extends Realm.Object<UserModel> {
    _id!: string;
    email!: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    creationTime!: string;
    // Account data
    name?: string;
    surname?: string;
    birthday?: string;
    height?: number;
    weight?: number;
    unit?: string;
    static schema = {
        name: 'User',
        properties: {
            _id: 'string',
            email: 'string',
            displayName: 'string?',
            photoURL: 'string',
            phoneNumber: 'string?',
            creationTime: 'string',
            // Account data
            name: 'string?',
            surname: 'string?',
            birthday: 'string?',
            height: 'int?',
            weight: 'int?',
            unit: 'string?',
        },
        primaryKey: '_id',
    };
}
