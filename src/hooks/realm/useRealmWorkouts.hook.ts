import {useQuery, useRealm} from 'src/services/realm.config';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import {useEffect} from 'react';

export const useRealmWorkouts = () => {
    const realm = useRealm();
    const workouts = useQuery(WorkoutSchema);

    useEffect(() => {
        return () => {
            realm.close();
        };
    }, []);

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
        workouts,
    };
};
