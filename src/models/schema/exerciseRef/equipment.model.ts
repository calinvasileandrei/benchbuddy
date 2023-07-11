import Realm from 'realm'
import {RealmCollections} from 'src/models/schema/realmTypes'

export interface EquipmentModel {
    id: string
    name: string
}

export class EquipmentSchema extends Realm.Object<EquipmentModel> {
    id!: string
    name!: string
    static schema = {
        name: RealmCollections.EQUIPMENT,
        embedded: true,
        properties: {
            id: 'string',
            name: 'string'
        }
    }
}
