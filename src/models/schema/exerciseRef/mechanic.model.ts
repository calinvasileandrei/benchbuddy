import Realm from 'realm';

export interface MechanicModel {
    id: string;
    name: string;
}

export class MechanicSchema extends Realm.Object<MechanicSchema> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Mechanic',
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
