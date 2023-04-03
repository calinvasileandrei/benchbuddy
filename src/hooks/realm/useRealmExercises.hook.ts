import {useRealm} from 'src/services/realm.config';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';

export const useRealmExercises = () => {
    const realm = useRealm();

    const closeRealm = () => {
        if (realm) {
            realm.close();
        }
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

    return {
        addItem,
        deleteItem,
        closeRealm,
    };
};
