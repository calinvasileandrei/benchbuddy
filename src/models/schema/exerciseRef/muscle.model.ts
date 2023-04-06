import Realm from 'realm';

export interface MuscleModel {
    id: string;
    name: string;
}

export class MuscleSchema extends Realm.Object<MuscleModel> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Muscle',
        properties: {
            id: 'string',
            name: 'string',
        },
        primaryKey: 'id',
    };
}

export class MuscleEmbeddedSchema extends Realm.Object<MuscleModel> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Muscle',
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
