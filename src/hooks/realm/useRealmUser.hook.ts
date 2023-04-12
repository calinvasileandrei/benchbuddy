import {useRealm} from 'src/services/realm.config';
import {WorkoutSchema} from 'src/models/schema/workout.model';
import {UserModel, UserSchema} from 'src/models/user.model';
import {Logger} from 'src/utils/logger';
import {RealmCollections} from 'src/models/schema/realmTypes';
import {useApp, useUser} from '@realm/react';
import {userUtils} from 'src/utils/user.utils';

const logger = new Logger('useRealmUser');
export const useRealmUser = () => {
    const realm = useRealm();
    const app = useApp();
    const user = useUser();
    const currentUser = app.currentUser;

    const closeRealm = () => {
        if (realm) {
            realm.close();
        }
    };

    const subscribe = async () => {
        await realm.subscriptions.update(subs => {
            subs.add(
                realm
                    .objects(RealmCollections.MUSCLE)
                    .filtered('ownerId = $0', currentUser?.id),
                {
                    name: 'workoutsSubscription',
                },
            );
        });
    };

    const registerUser = (data: UserModel) => {
        realm.write(() => {
            new UserSchema(realm, {
                id: data.id,
                email: data.email,
                displayName: data.displayName,
                photoURL: data.photoURL,
                phoneNumber: data.phoneNumber,
                creationTime: data.creationTime,
            });
        });
        logger.debug('User registered', data);
    };

    const deleteItem = (id: string) => {
        realm.write(() => {
            const item = realm.objectForPrimaryKey(WorkoutSchema, id);
            realm.delete(item);
        });
    };

    const getUser = () => {
        return userUtils.mongoUserToModel(user);
    };

    return {
        user: getUser(),
        registerUser,
        deleteItem,
        closeRealm,
        subscribe,
    };
};
