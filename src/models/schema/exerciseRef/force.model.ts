import Realm from 'realm';

export interface ForceModel {
    id: string;
    name: string;
}

export class ForceSchema extends Realm.Object<ForceModel> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Force',
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
