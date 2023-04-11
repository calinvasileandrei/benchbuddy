import {useRealm} from 'src/services/realm.config';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import {
    RealmCollections,
    RealmSubscriptions,
} from 'src/models/schema/realmTypes';

export const useRealmExercises = () => {
    const realm = useRealm();

    const closeRealm = () => {
        if (realm) {
            realm.close();
        }
    };

    const subscribe = async () => {
        await realm.subscriptions.update(subs => {
            subs.add(realm.objects(RealmCollections.EXERCISE), {
                name: RealmSubscriptions.EXERCISE,
            });
        });
    };

    const addItem = (data: ExerciseModel) => {
        realm.write(() => {
            new ExerciseSchema(realm, data);
        });
    };

    const deleteItem = (id: string) => {
        realm.write(() => {
            const item = realm.objectForPrimaryKey(ExerciseSchema, id);
            realm.delete(item);
        });
    };

    const count = (): number => {
        return realm.objects(RealmCollections.EXERCISE).length;
    };

    return {
        addItem,
        deleteItem,
        closeRealm,
        subscribe,
        count,
    };
};
