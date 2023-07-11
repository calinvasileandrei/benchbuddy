import Realm from 'realm'
import {RealmCollections} from 'src/models/schema/realmTypes'

export interface MuscleModel {
    _id: string
    name: string
}

export class MuscleSchema extends Realm.Object<MuscleModel> {
    _id!: string
    name!: string
    static schema = {
        name: RealmCollections.MUSCLE,
        properties: {
            _id: 'string',
            name: 'string'
        },
        primaryKey: '_id'
    }
}
