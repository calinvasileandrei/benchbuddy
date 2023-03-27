import {FilterObject, GetPaginatedListParams} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {typesenseClient} from 'src/services/typesenseConfig';
import {SearchParams, SearchResponse} from 'typesense/lib/Typesense/Documents';
import {Logger} from 'src/utils/logger';

const logger = new Logger('typesenseInfiniteList.service')

const getFilters = (filterBy?: FilterObject[]): string => {
    let filterQuery = ''

    filterBy?.forEach((filter, index) => {
        if (filter.value.length === 0) return

        if (index > 0) {
            filterQuery += ' & '
        }
        if (filter.value.length === 1) {
            filterQuery += `${filter.field}: ${filter.value[0]}`
            return;
        }

        const filtersValue = filter.value.map((v) => `${v}`).join(', ')

        filterQuery += `${filter.field}: [${filtersValue}]`
    })

    return filterQuery
}

export const getPaginatedList = async <T>({col, orderValue, paginationParams}: GetPaginatedListParams<T>) => {
    logger.debug('getPaginatedList', {col, orderValue, paginationParams})
    // @ts-ignore
    let searchParameters: SearchParams = {
        'q': paginationParams.searchTextParam || '*',
        'query_by': orderValue.toString(),
        'per_page': paginationParams.size,
        'page': paginationParams.page,
        'filter_by': getFilters(paginationParams.filterBy)

    }

    const res: SearchResponse<any> = await typesenseClient.collections(col)
        .documents()
        .search(searchParameters)

    logger.debug(`Response of ${paginationParams.searchTextParam}:`, res.hits?.map((doc) => doc.document.name))

    if (res.hits) {
        return res.hits.map((doc) => doc.document as T);
    }
    return []
}


export const typesenseInfiniteListWithStoreService = {
    getPaginatedList
}
