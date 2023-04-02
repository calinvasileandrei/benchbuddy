import {useRealm} from 'src/services/realm.config';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import {Collections} from 'src/services/types';
import {UserService} from 'src/services/app/user.service';
import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';

export const useRealmWorkouts = () => {
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

    const addItem = (data: WorkoutModel) => {
        realm.write(() => {
            new WorkoutSchema(realm, {
                ...data,
                ownerId: currentUser?.uid,
            });
        });
    };

    const updateItem = (id: Realm.BSON.ObjectId, data: WorkoutModel) => {
        realm.write(() => {
            realm.create(
                RealmCollections.WORKOUT,
                {
                    ...data,
                    _id: id,
                },
                Realm.UpdateMode.Modified,
            );
        });
    };

    const deleteItem = (id: Realm.BSON.ObjectId) => {
        realm.write(() => {
            const item = realm.objectForPrimaryKey(WorkoutSchema, id);
            realm.delete(item);
        });
    };

    return {
        addItem,
        deleteItem,
        closeRealm,
        subscribe,
        updateItem,
    };
};
