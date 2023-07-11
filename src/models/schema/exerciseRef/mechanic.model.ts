import Realm from 'realm'
import {RealmCollections} from 'src/models/schema/realmTypes'

export interface MechanicModel {
    id: string
    name: string
}

export class MechanicSchema extends Realm.Object<MechanicModel> {
    id!: string
    name!: string
    static schema = {
        name: RealmCollections.MECHANIC,
        embedded: true,
        properties: {
            id: 'string',
            name: 'string'
        }
    }
}
