import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {typesenseClient} from 'src/services/typesenseConfig';
import {TypesenseCollections} from 'src/models/extra/typesense.model';
import {workoutSessionSchema, WorkoutSessionHitModel} from 'src/models/typesense/workoutSession.schema';
import {dateUtils} from 'src/utils/date.utils';
import {Logger} from 'src/utils/logger';

const logger = new Logger('workoutSession.typesense.servise.ts');

const addWorkoutSession = async (workoutSession: WorkoutSessionModel) => {
    const workoutSessionForTypesense:WorkoutSessionHitModel = {
        id: workoutSession.id,
        workoutName: workoutSession.referenceWorkout.name,
        createdAt: dateUtils.dateToUnixTimestamp(workoutSession.createdAt),
        exercises: workoutSession.referenceWorkout.exercises.map((exercise) => exercise.exercise.name),
        notes: workoutSession.notes
    }
    try {
        const returnData = await typesenseClient
            .collections(TypesenseCollections.WORKOUT_SESSIONS)
            .documents()
            .import([workoutSessionForTypesense]);
        logger.debug('Typesense response addWorkoutSession: ', returnData);
        logger.debug('Workout session added to typesense');
        return returnData;
    } catch (error) {
        logger.error('addWorkoutSession error:',error);
    }

}

const updateWorkoutSession = async (workoutSession: WorkoutSessionModel) => {
    const workoutSessionForTypesense:WorkoutSessionHitModel = {
        id: workoutSession.id,
        workoutName: workoutSession.referenceWorkout.name,
        createdAt: dateUtils.dateToUnixTimestamp(workoutSession.createdAt),
        exercises: workoutSession.referenceWorkout.exercises.map((exercise) => exercise.exercise.name),
        notes: workoutSession.notes
    }
    try {
        const returnData = await typesenseClient
            .collections(TypesenseCollections.WORKOUT_SESSIONS)
            .documents()
            .update(workoutSessionForTypesense);
        logger.debug('Typesense response updateWorkoutSession: ', returnData);
        logger.debug('Workout session added to typesense');
        return returnData;
    } catch (error) {
        logger.error('updateWorkoutSession error:',error);
    }

}

const deleteWorkoutSession = async (workoutSessionId: string) => {
    try {
        const returnData = await typesenseClient
            .collections(TypesenseCollections.WORKOUT_SESSIONS)
            .documents(workoutSessionId)
            .delete();
        logger.debug('Typesense response deleteWorkoutSession: ', returnData);
        logger.debug('Workout session deleted from typesense');
        return returnData;
    } catch (error) {
        logger.error('deleteWorkoutSession error:',error);
    }
}

const initSchema = async () => {
    try {
        logger.debug('Init schema, deleting existing schema');
        try {
            await typesenseClient.collections(TypesenseCollections.WORKOUT_SESSIONS).delete();
            logger.debug('Existing schema deleted')
        }catch (e){
            logger.debug('No existing schema to delete');
        }
        logger.debug('Creating new schema');
        await typesenseClient.collections().create(workoutSessionSchema);
        logger.debug('Schema created');
    }catch (e) {
        logger.error('initSchema error:',e);
    }

}

const fetchCollection = async () => {
    try {
        const collection = await typesenseClient.collections(TypesenseCollections.WORKOUT_SESSIONS).documents().search({
            q: '*',
            query_by: 'workoutName',
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

export const workoutSessionTypesenseService = {
    addWorkoutSession,
    deleteWorkoutSession,
    fetchCollection,
    initSchema,
    updateWorkoutSession
}
