import Realm from 'realm';

export interface CategoryModel {
    id: string;
    name: string;
}

export class CategorySchema extends Realm.Object<CategoryModel> {
    id!: string;
    name!: string;
    static schema = {
        name: 'Category',
        embedded: true,
        properties: {
            id: 'string',
            name: 'string',
        },
    };
}
