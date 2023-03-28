import {useRealm} from 'src/services/realm.config';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';

export const useRealmWorkouts = () => {
    const realm = useRealm();

    const closeRealm = () => {
        if (realm) {
            realm.close();
        }
    };

    const addItem = (data: WorkoutModel) => {
        realm.write(() => {
            new WorkoutSchema(realm, data);
        });
    };

    const deleteItem = (id: string) => {
        realm.write(() => {
            const item = realm.objectForPrimaryKey(WorkoutSchema, id);
            realm.delete(item);
        });
    };

    return {
        addItem,
        deleteItem,
        closeRealm,
    };
};
