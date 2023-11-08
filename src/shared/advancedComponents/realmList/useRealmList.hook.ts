import {useEffect} from 'react'
import {Logger} from 'src/utils/logger'
import {useQuery, useRealm} from 'src/services/realm.config'
import {useRealmListParams, useRealmListReturn} from './types'
import {realmMapper} from 'src/utils/realmMapper.utils'
import {filterByUtils} from 'src/utils/filterBy.utils'

const logger = new Logger('useRealmList.hook')
export const useRealmList = <T, I>({
    keyExtractorKey,
    schema,
    searchTextParam,
    searchField,
    filterBy,
    subscriptionName,
    orderBy
}: useRealmListParams<T, I>): useRealmListReturn<T, I> => {
    const realm = useRealm()
    const dataNotFiltered = useQuery<Realm.Object<T>>(schema)

    useEffect(() => {
        logger.debug(
            `data changed: [searchTextParam, ${searchTextParam}] , [filterBy, ${filterBy}]`
        )
    }, [dataNotFiltered, searchTextParam])

    useEffect(() => {
        if (subscriptionName) {
            realm.subscriptions.update((mutableSubs, realmSync) => {
                // Create subscription query
                const subQuery = realmSync.objects(schema.schema.name)
                // Create subscription for filtered results.
                mutableSubs.add(subQuery, {name: subscriptionName})
            })
        }
    })

    const keyExtractor = (item: I) => {
        const key = item[keyExtractorKey] // as unknown as string;
        if (typeof key == Realm.BSON.ObjectId.name) {
            return (key as Realm.BSON.ObjectId).toHexString()
        }
        return key as string
    }

    const getFilteredData = () => {
        let returnData = dataNotFiltered

        if (filterBy) {
            filterByUtils.applyFilterObjects(filterBy, 'OR').map(query => {
                returnData = dataNotFiltered.filtered(query)
            })
        }

        if (searchTextParam) {
            returnData = dataNotFiltered.filtered(
                `${searchField as string} CONTAINS[c] "${searchTextParam}"`
            )
        }

        if (orderBy) {
            returnData = returnData.sorted(orderBy.field as string, orderBy.reverse || false)
        }

        return returnData
    }

    return {
        data: realmMapper.schemaToObject(getFilteredData()),
        keyExtractor
    }
}
