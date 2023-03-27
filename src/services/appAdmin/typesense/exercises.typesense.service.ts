import {typesenseClient} from 'src/services/typesenseConfig';
import {TypesenseCollections} from 'src/models/extra/typesense.model';
import {ExerciseModel} from 'src/models/schema/exercise.model';
import {exercisesSchema} from 'src/models/typesense/exercises.typesense.schema';

const initAndPopulate = async () => {
    //client
    const exercisesArray = require('../../../../exports/exportDir/exercises.json');

    const exercisesForTypesense = exercisesArray.map((exercise: ExerciseModel) => {
        return {
            id: exercise.id,
            name: exercise.name,
            category: exercise.category.name,
            primaryMuscles: exercise.primaryMuscles.map((muscle) => muscle.name),
            secondaryMuscles: exercise.secondaryMuscles.map((muscle) => muscle.name),
        }
    })

    console.log('Loaded data, ready to populate typesense length:', exercisesForTypesense.length)
    console.log('Check if collection exists');

    try {
        const collection = await typesenseClient.collections(TypesenseCollections.EXERCISES).retrieve();
        if (collection.num_documents > 0) {
            console.log('Collection exists and has documents');
            console.log('Deleting existing schema');
            await typesenseClient.collections(TypesenseCollections.EXERCISES).delete();
            console.log('Schema deleted');
        } else {
            console.log('Collection exists but has no documents or delete failed');
        }
    } catch (e) {
        console.log('No collection exists');
    }

    console.log('Creating schema: ');
    console.log(JSON.stringify(exercisesSchema, null, 2));
    await typesenseClient.collections().create(exercisesSchema);

    console.log('Populating index in Typesense');

    try {
        const returnData = await typesenseClient
            .collections(TypesenseCollections.EXERCISES)
            .documents()
            .import(exercisesForTypesense);

        console.log('Return data: ', returnData);
        console.log('Done indexing.');
        return returnData;
    } catch (error) {
        console.log(error);
    }
}

const fetchCollection = async () => {
    try {
        const collection = await typesenseClient.collections(TypesenseCollections.EXERCISES).documents().search({
            q: '*',
            query_by: 'name',
        });
        if (collection && collection.hits && collection.hits?.length > 0) {
            console.log('Collection exists and has documents', collection.hits)
            return
        }
        console.log('Collection has no documents')

    } catch (e) {
        console.log('No collection exists');
    }
}

export const exercisesTypesenseService = {
    initAndPopulate,
    fetchCollection
}
