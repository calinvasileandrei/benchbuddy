import {useRealm} from 'src/services/realm.config';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import {Collections} from 'src/services/types';
import {UserService} from 'src/services/app/user.service';
import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';
import {ExerciseSchema} from 'src/models/schema/exercise.model';

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
                _id: new Realm.BSON.ObjectId(),
                exercises: data.exercises.map(exerciseWorkout => {
                    // get the existing exercise from the realm
                    const existingExercise = realm.objectForPrimaryKey(
                        ExerciseSchema,
                        exerciseWorkout.exercise.id,
                    );
                    return {
                        id: exerciseWorkout.id,
                        exercise: existingExercise,
                        description: exerciseWorkout.description,
                        exerciseSets: exerciseWorkout.exerciseSets,
                    };
                }),
                name: data.name,
                notes: data.notes,
                description: data.description,
                createdAt: data.createdAt,
                ownerId: currentUser?.uid,
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
                            exerciseWorkout.exercise.id,
                        );
                        return {
                            id: exerciseWorkout.id,
                            exercise: existingExercise,
                            description: exerciseWorkout.description,
                            exerciseSets: exerciseWorkout.exerciseSets,
                        };
                    }),
                    name: data.name,
                    notes: data.notes,
                    description: data.description,
                    createdAt: data.createdAt,
                    ownerId: currentUser?.uid,
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
