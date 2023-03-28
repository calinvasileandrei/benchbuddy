import {CollectionCreateSchema} from 'typesense/lib/Typesense/Collections';
import {TypesenseCollections} from 'src/models/extra/typesense.model';

export const workoutSessionSchema: CollectionCreateSchema = {
    name: TypesenseCollections.WORKOUT_SESSIONS,
    fields: [
        {
            name: 'id',
            type: 'string',
            facet: false,
        },
        {
            name: 'workoutName',
            type: 'string',
            sort: true,
            facet: false,
        },
        {
            name: 'createdAt',
            type: 'int64',
            sort: true,
            facet: false,
        },
        {
            name: 'exercises',
            type: 'string[]',
            facet: false,
        },
        {
            name: 'notes',
            type: 'string',
            facet: false,
        },
    ],
};

export interface WorkoutSessionHitModel {
    id: string;
    workoutName: string;
    createdAt: number;
    exercises: string[];
    notes?: string;
}

export const WorkoutSessionCollectionFields = {
    ID: 'id',
    WORKOUT_NAME: 'workoutName',
    CREATED_AT: 'createdAt',
    EXERCISES: 'exercises',
    NOTES: 'notes',
};
