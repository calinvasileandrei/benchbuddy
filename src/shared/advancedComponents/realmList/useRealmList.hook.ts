import {useEffect} from 'react';
import {Logger} from 'src/utils/logger';
import {useQuery} from 'src/services/realm.config';
import {useRealmListParams, useRealmListReturn} from './types';
import {realmMapper} from 'src/utils/realmMapper.utils';

const logger = new Logger('useFirestoreList.hook');
export const useRealmList = <T, I>({
    keyExtractorKey,
    schema,
}: useRealmListParams<T, I>): useRealmListReturn<T, I> => {
    const data = useQuery<Realm.Object<T>>(schema);

    useEffect(() => {
        logger.debug('data changed', data);
    }, [data]);

    const keyExtractor = (item: I) =>
        item[keyExtractorKey] as unknown as string;

    return {
        data: realmMapper.schemaToObject(data),
        keyExtractor,
    };
};
