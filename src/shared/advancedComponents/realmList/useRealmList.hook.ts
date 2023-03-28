import {useEffect} from 'react';
import {Logger} from 'src/utils/logger';
import {useQuery} from 'src/services/realm.config';
import {useRealmListParams, useRealmListReturn} from './types';

const logger = new Logger('useFirestoreList.hook');
export const useRealmList = <T, I>({
    keyExtractorKey,
    schema,
}: useRealmListParams<T, I>): useRealmListReturn<T, I> => {
    const data = useQuery<T>(schema);

    useEffect(() => {
        logger.debug('data changed', data);
    }, [data]);

    const keyExtractor = (item: T) =>
        item[keyExtractorKey] as unknown as string;

    function transformOnTimeObject(dataRaw: Realm.Object<T>): I {
        const keys = dataRaw.entries();

        const result: any = {};

        keys.forEach(item => {
            let key = item[0];
            result[key] = item[1];
        });

        return result as I;
    }

    function transformOnTimeArray(dataRaw: Realm.Results<T> | undefined): I[] {
        return (dataRaw || []).map(item => {
            return transformOnTimeObject(item as Realm.Object<T>);
        });
    }

    return {
        data: transformOnTimeArray(data),
        keyExtractor,
    };
};
