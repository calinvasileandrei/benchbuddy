/*
import {Logger} from 'src/utils/logger';
import {UserSchema} from 'src/models/user.model';
import Realm from 'realm';

interface withMethodName {
  methodName?: string;
}

interface addDocParams<T> extends withMethodName {
  schema: new (realm: Realm, data: T) => any;
  data: T;
}

interface getDocParams<T> extends withMethodName {
  schema: string | {new (...args: any): unknown};
  objectId: string;
}

interface getDocByFieldParams<T> extends withMethodName {
  schema: string | {new (...args: any): unknown};
  objectId: string;
  field: keyof T;
}

export const logger = new Logger('myRealmService');

const realmConfig = {
  schema: [UserSchema],
};

const getDoc = async <T>({schema, objectId, methodName}: getDocParams<T>) => {
  try {
    const realm = await Realm.open(realmConfig);
    const res = realm.objectForPrimaryKey(schema, objectId);
    logger.debug(`getDoc ${methodName} :`, res);
    return res as T;
  } catch (e: any) {
    logger.error(`getDoc ${methodName} error:`, e.message);
  }
};

const getDocByField = async <T>({
  schema,
  objectId,
  field,
  methodName,
}: getDocByFieldParams<T>) => {
  try {
    const realm = await Realm.open(realmConfig);
    const res = realm
      .objects(schema)
      .filtered(`${field as string} = ${objectId}`);
    logger.debug(`getDoc ${methodName} :`, res[0]);
    return res as T;
  } catch (e: any) {
    logger.error(`getDoc ${methodName} error:`, e.message);
  }
};

const addDoc = async <T>({schema, data, methodName}: addDocParams<T>) => {
  try {
    const realm = await Realm.open(realmConfig);
    realm.write(() => {
      new schema(realm, {...data});
    });
    logger.debug(`addDoc ${methodName}`);
  } catch (e: any) {
    logger.error(`addDoc ${methodName} error:`, e.message);
  }
};

export const myRealmService = {
  getDoc,
  getDocByField,
  addDoc,
};
*/
