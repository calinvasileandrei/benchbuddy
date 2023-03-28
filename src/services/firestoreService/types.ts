import {Collections} from 'src/services/types';

interface withMethodName {
    methodName?: string;
}

export interface addDocParams<T> extends withMethodName {
    collection: Collections;
    data: T;
}

export interface setDocParams<T> extends withMethodName {
    collection: Collections;
    data: T;
    docId: string;
}

export interface getDocParams<T> extends withMethodName {
    collection: Collections;
    docId: string;
}

export interface getCollectionParams<T> extends withMethodName {
    collection: Collections;
}

export interface getQueryCollectionParams<T> extends withMethodName {
    collection: Collections;
}

export interface deleteDocParams extends withMethodName {
    collection: Collections;
    docId: string;
}

export interface updateDocParams<T> extends withMethodName {
    collection: Collections;
    docId: string;
    data: T;
}
