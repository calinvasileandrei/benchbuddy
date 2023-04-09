import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';

export interface CategoryModel {
    id: string;
    name: string;
}

export class CategorySchema extends Realm.Object<CategoryModel> {
    id!: string;
    name!: string;
    static schema = {
        name: RealmCollections.CATEGORY,
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
