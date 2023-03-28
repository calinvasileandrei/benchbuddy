import {CollectionCreateSchema} from 'typesense/lib/Typesense/Collections';

export const exercisesSchema: CollectionCreateSchema = {
    name: 'exercises',
    fields: [
        {
            name: 'id',
            type: 'string',
            facet: false,
        },
        {
            name: 'name',
            type: 'string',
            sort: true,
            facet: false,
        },
        {
            name: 'category',
            type: 'string',
            facet: false,
        },
        {
            name: 'primaryMuscles',
            type: 'string[]',
            facet: false,
        },
        {
            name: 'secondaryMuscles',
            type: 'string[]',
            facet: false,
        },
    ],
};
