import Realm from 'realm';

export interface LevelModel {
    id: string;
    name: string;
}

export class LevelSchema extends Realm.Object<LevelSchema> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Level',
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
