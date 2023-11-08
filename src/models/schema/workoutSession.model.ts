import {ExerciseWorkoutModel, ExerciseWorkoutSchema} from 'src/models/schema/exerciseWorkout.model'
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model'
import Realm from 'realm'
import {RealmCollections} from 'src/models/schema/realmTypes'

export interface WorkoutSessionModel {
    _id: Realm.BSON.ObjectId
    referenceWorkout: WorkoutModel
    sessionExercises: ExerciseWorkoutModel[]
    notes?: string
    duration: string
    createdAt: number
    ownerId: string
}

export class WorkoutSessionSchema extends Realm.Object<WorkoutSessionSchema> {
    _id!: Realm.BSON.ObjectId
    referenceWorkout!: WorkoutSchema
    sessionExercises!: Realm.List<ExerciseWorkoutSchema>
    notes?: string
    duration!: string
    createdAt!: number
    ownerId!: string
    static schema = {
        name: RealmCollections.WORKOUT_SESSION,
        properties: {
            _id: 'objectId',
            referenceWorkout: 'Workout',
            sessionExercises: 'ExerciseWorkout[]',
            notes: 'string?',
            createdAt: 'int',
            ownerId: 'string'
        },
        primaryKey: '_id'
    }
}
