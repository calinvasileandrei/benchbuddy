import Realm from 'realm'
import {RealmCollections} from 'src/models/schema/realmTypes'

export interface LevelModel {
    id: string
    name: string
}

export class LevelSchema extends Realm.Object<LevelModel> {
    id!: string
    name!: string
    static schema = {
        name: RealmCollections.LEVEL,
        embedded: true,
        properties: {
            id: 'string',
            name: 'string'
        }
    }
}
