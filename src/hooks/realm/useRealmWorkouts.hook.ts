import {useRealm} from 'src/services/realm.config';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';
import {ExerciseSchema} from 'src/models/schema/exercise.model';
import {useApp} from '@realm/react';

export const useRealmWorkouts = () => {
    const realm = useRealm();
    const app = useApp();
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

    const addItem = (data: WorkoutModel) => {
        realm.write(() => {
            new WorkoutSchema(realm, {
                _id: new Realm.BSON.ObjectId(),
                exercises: data.exercises.map(exerciseWorkout => {
                    // get the existing exercise from the realm
                    const existingExercise = realm.objectForPrimaryKey(
                        ExerciseSchema,
                        exerciseWorkout.exercise._id,
                    );
                    return {
                        _id: exerciseWorkout._id,
                        exercise: existingExercise,
                        description: exerciseWorkout.description,
                        exerciseSets: exerciseWorkout.exerciseSets,
                    };
                }),
                name: data.name,
                notes: data.notes,
                description: data.description,
                createdAt: data.createdAt,
                ownerId: currentUser?.id,
            });
        });
    };

    const updateItem = (id: Realm.BSON.ObjectId, data: WorkoutModel) => {
        realm.write(() => {
            realm.create(
                RealmCollections.WORKOUT,
                {
                    _id: id,
                    exercises: data.exercises.map(exerciseWorkout => {
                        // get the existing exercise from the realm
                        const existingExercise = realm.objectForPrimaryKey(
                            ExerciseSchema,
                            exerciseWorkout.exercise._id,
                        );
                        return {
                            _id: exerciseWorkout._id,
                            exercise: existingExercise,
                            description: exerciseWorkout.description,
                            exerciseSets: exerciseWorkout.exerciseSets,
                        };
                    }),
                    name: data.name,
                    notes: data.notes,
                    description: data.description,
                    createdAt: data.createdAt,
                    ownerId: currentUser?.id,
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
