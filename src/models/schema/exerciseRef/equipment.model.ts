import Realm from 'realm';

export interface EquipmentModel {
    id: string;
    name: string;
}

export class EquipmentSchema extends Realm.Object<EquipmentModel> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Equipment',
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
