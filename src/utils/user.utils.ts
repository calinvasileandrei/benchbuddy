import {UserModel} from 'src/models/user.model';

const mongoUserToModel = (userMongo: Realm.User<any> | null) => {
    const user: UserModel = {
        id: userMongo?.id || '',
        phoneNumber: '',
        email: userMongo?.profile.email || '',
        creationTime: '',
        photoURL: userMongo?.profile.pictureUrl || '',
        displayName: userMongo?.profile.name || '',
    };

    return user;
};

export const userUtils = {
    mongoUserToModel,
};
