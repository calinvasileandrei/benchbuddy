import Realm from 'realm';

export interface LevelModel {
    id: string;
    name: string;
}

export class LevelSchema extends Realm.Object<LevelModel> {
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
