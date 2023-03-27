import {FirebaseDocumentData} from 'src/services/types';
import firestore from '@react-native-firebase/firestore';
import {Logger} from 'src/utils/logger';
import {
    addDocParams,
    deleteDocParams,
    getCollectionParams,
    getDocParams,
    getQueryCollectionParams,
    setDocParams,
    updateDocParams,
} from './types';

export const logger = new Logger('myFirestoreService');

export const addDoc = async <T>({
    collection,
    data,
    methodName,
}: addDocParams<T>) => {
    try {
        const res = await firestore()
            .collection(`${collection}`)
            .add({
                ...(data as any),
            });

        logger.debug(`addDoc ${methodName} : done with id: ${res.id}`);
        return res;
    } catch (e: any) {
        logger.error(`addDoc ${methodName} error:`, e.message);
    }
};

export const setDoc = async <T>({
    collection,
    data,
    docId,
    methodName,
}: setDocParams<T>) => {
    try {
        await firestore()
            .collection(`${collection}`)
            .doc(`${docId}`)
            .set({
                ...(data as any),
            });
        logger.debug(`setDoc ${methodName} : done`);
    } catch (e: any) {
        logger.error(`setDoc ${methodName} error:`, e.message);
    }
};

export const getDoc = async <T>({
    collection,
    docId,
    methodName,
}: getDocParams<T>) => {
    try {
        const res = await firestore()
            .collection(`${collection}`)
            .doc(`${docId}`)
            .get();
        logger.debug(`getDoc ${methodName} :`, res.data());
        return res.data() as any;
    } catch (e: any) {
        logger.error(`getDoc ${methodName} error:`, e.message);
    }
};

const getCollection = async <T>({
    collection,
    methodName,
}: getCollectionParams<T>) => {
    try {
        const res = await firestore().collection(`${collection}`).get();
        logger.debug(`getCollection ${methodName} elements:`, res.size);
        return docsConverter<T>(res.docs);
    } catch (e: any) {
        logger.error(`getCollection ${methodName} error:`, e.message);
        return [];
    }
};

const queryCollection = <T>({
    collection,
    methodName,
}: getQueryCollectionParams<T>) => {
    logger.debug(`queryCollection ${methodName} :`, collection);
    return firestore().collection(collection);
};

const deleteDoc = async ({collection, docId, methodName}: deleteDocParams) => {
    try {
        const res = await firestore()
            .collection(`${collection}`)
            .doc(`${docId}`)
            .delete();
        logger.debug(`deleteDoc ${methodName} :`, res);
    } catch (e: any) {
        logger.error(`deleteDoc ${methodName} error:`, e.message);
    }
};

const updateDoc = async <T>({collection, docId, data}: updateDocParams<T>) => {
    try {
        const res = await firestore()
            .collection(`${collection}`)
            .doc(`${docId}`)
            .update({
                ...(data as any),
            });
        logger.debug('updateDoc :', res);
    } catch (e: any) {
        logger.error('updateDoc error:', e.message);
    }
};

const docsConverter = <T>(snapshot: FirebaseDocumentData[]): T[] => {
    return snapshot.map((doc: any) => doc.data() as T);
};

export const myFirestoreService = {
    addDoc,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    getCollection,
    queryCollection,
    docsConverter,
};
