import {useRealm} from 'src/services/realm.config'
import {WorkoutSchema} from 'src/models/schema/workout.model'
import Realm from 'realm'
import {RealmCollections, RealmSubscriptions} from 'src/models/schema/realmTypes'
import {ExerciseSchema} from 'src/models/schema/exercise.model'
import {useApp} from '@realm/react'
import {WorkoutSessionModel, WorkoutSessionSchema} from 'src/models/schema/workoutSession.model'

export const useRealmWorkoutSession = () => {
    const realm = useRealm()
    const app = useApp()
    const currentUser = app.currentUser

    const closeRealm = () => {
        if (realm) {
            realm.close()
        }
    }

    const subscribe = async () => {
        await realm.subscriptions.update(subs => {
            subs.add(
                realm
                    .objects(RealmCollections.WORKOUT_SESSION)
                    .filtered('ownerId = $0', currentUser?.id),
                {
                    name: RealmSubscriptions.WORKOUT_SESSION
                }
            )
        })
    }

    const addItem = (data: WorkoutSessionModel) => {
        realm.write(() => {
            new WorkoutSessionSchema(realm, {
                _id: new Realm.BSON.ObjectId(),
                referenceWorkout: realm.objectForPrimaryKey(
                    WorkoutSchema,
                    data.referenceWorkout._id
                ),
                sessionExercises: data.sessionExercises.map(exerciseWorkout => {
                    // get the existing exercise from the realm
                    const existingExercise = realm.objectForPrimaryKey(
                        ExerciseSchema,
                        exerciseWorkout.exercise._id
                    )
                    return {
                        _id: exerciseWorkout._id,
                        exercise: existingExercise,
                        description: exerciseWorkout.description,
                        exerciseSets: exerciseWorkout.exerciseSets
                    }
                }),
                notes: data.notes,
                duration: data.duration,
                createdAt: data.createdAt,
                ownerId: currentUser?.id
            })
        })
    }

    const updateItem = (_id: Realm.BSON.ObjectId, data: WorkoutSessionModel) => {
        realm.write(() => {
            realm.create(
                RealmCollections.WORKOUT_SESSION,
                {
                    _id,
                    referenceWorkout: realm.objectForPrimaryKey(
                        WorkoutSchema,
                        data.referenceWorkout._id
                    ),
                    sessionExercises: data.sessionExercises.map(exerciseWorkout => {
                        // get the existing exercise from the realm
                        const existingExercise = realm.objectForPrimaryKey(
                            ExerciseSchema,
                            exerciseWorkout.exercise._id
                        )
                        return {
                            _id: exerciseWorkout._id,
                            exercise: existingExercise,
                            description: exerciseWorkout.description,
                            exerciseSets: exerciseWorkout.exerciseSets
                        }
                    }),
                    notes: data.notes,
                    duration: data.duration,
                    createdAt: data.createdAt,
                    ownerId: currentUser?.id
                },
                Realm.UpdateMode.Modified
            )
        })
    }

    const deleteItem = (id: Realm.BSON.ObjectId) => {
        realm.write(() => {
            const item = realm.objectForPrimaryKey(WorkoutSessionSchema, id)
            realm.delete(item)
        })
    }

    return {
        addItem,
        deleteItem,
        closeRealm,
        subscribe,
        updateItem
    }
}
