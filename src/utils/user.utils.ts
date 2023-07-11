import {UserModel} from 'src/models/user.model';

const mongoUserToModel = (userMongo: Realm.User<any>): UserModel => {
    const user: UserModel = {
        _id: userMongo.id,
        email: userMongo.profile.email || '',
        displayName: userMongo.profile.name || '',
        photoURL: userMongo.profile.pictureUrl || '',
        phoneNumber: '',
        name: userMongo.profile.firstName || '',
        surname: userMongo.profile.lastName || '',
        birthday: userMongo.profile.birthday || '',
        height: 0,
        weight: 0,
        creationTime: new Date().toDateString(),
    };

    return user;
};

export const userUtils = {
    mongoUserToModel,
};
