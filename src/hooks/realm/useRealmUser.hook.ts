import {useRealm} from 'src/services/realm.config';
import {WorkoutSchema} from 'src/models/schema/workout.model';
import {Collections} from 'src/services/types';
import {UserService} from 'src/services/app/user.service';
import {UserModel, UserSchema} from 'src/models/user.model';
import {Logger} from 'src/utils/logger';

const logger = new Logger('useRealmUser');
export const useRealmUser = () => {
    const realm = useRealm();
    const currentUser = UserService.getAuthUser();

    const closeRealm = () => {
        if (realm) {
            realm.close();
        }
    };

    const subscribe = async () => {
        await realm.subscriptions.update(subs => {
            subs.add(
                realm
                    .objects(Collections.MUSCLES)
                    .filtered('ownerId = $0', currentUser?.uid),
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

    return {
        registerUser,
        deleteItem,
        closeRealm,
        subscribe,
    };
};
