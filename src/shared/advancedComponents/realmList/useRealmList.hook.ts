import {useEffect} from 'react';
import {Logger} from 'src/utils/logger';
import {useQuery} from 'src/services/realm.config';
import {useRealmListParams, useRealmListReturn} from './types';
import {realmMapper} from 'src/utils/realmMapper.utils';
import {filterByUtils} from 'src/utils/filterBy.utils';

const logger = new Logger('useRealmList.hook');
export const useRealmList = <T, I>({
    keyExtractorKey,
    schema,
    searchTextParam,
    searchField,
    filterBy,
}: useRealmListParams<T, I>): useRealmListReturn<T, I> => {
    const dataNotFiltered = useQuery<Realm.Object<T>>(schema);

    useEffect(() => {
        logger.debug(
            `data changed: [searchTextParam, ${searchTextParam}] , [filterBy, ${filterBy}]`,
        );
    }, [dataNotFiltered, searchTextParam]);

    const keyExtractor = (item: I) => {
        const key = item[keyExtractorKey]; // as unknown as string;
        if (typeof key == Realm.BSON.ObjectId.name) {
            return (key as Realm.BSON.ObjectId).toHexString();
        }
        return key as string;
    };

    const getFilteredData = () => {
        let returnData;

        if (filterBy) {
            filterByUtils.applyFilterObjects(filterBy, 'OR').map(query => {
                returnData = dataNotFiltered.filtered(query);
            });
        }

        if (searchTextParam) {
            returnData = dataNotFiltered.filtered(
                `${searchField as string} CONTAINS[c] "${searchTextParam}"`,
            );
        }

        return returnData || dataNotFiltered;
    };

    return {
        data: realmMapper.schemaToObject(getFilteredData()),
        keyExtractor,
    };
};
