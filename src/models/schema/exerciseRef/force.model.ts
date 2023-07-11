import Realm from 'realm'
import {RealmCollections} from 'src/models/schema/realmTypes'

export interface ForceModel {
    id: string
    name: string
}

export class ForceSchema extends Realm.Object<ForceModel> {
    id!: string
    name!: string
    static schema = {
        name: RealmCollections.FORCE,
        embedded: true,
        properties: {
            id: 'string',
            name: 'string'
        }
    }
}
