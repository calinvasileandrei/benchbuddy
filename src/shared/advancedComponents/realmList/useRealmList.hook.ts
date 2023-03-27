import {useEffect} from 'react';
import {Logger} from 'src/utils/logger';
import {useQuery} from 'src/services/realm.config';
import {useRealmListParams, useRealmListReturn} from './types';

const logger = new Logger('useFirestoreList.hook');
export const useRealmList = <T>({
    keyExtractorKey,
    schema,
}: useRealmListParams<T>): useRealmListReturn<T> => {
    const data = useQuery<T>(schema);

    useEffect(() => {
        logger.debug('data changed', data);
    }, [data]);

    const keyExtractor = (item: T) =>
        item[keyExtractorKey] as unknown as string;

    return {
        data,
        keyExtractor,
    };
};
