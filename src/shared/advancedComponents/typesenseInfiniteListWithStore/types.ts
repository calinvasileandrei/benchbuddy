import {TypesenseCollections} from 'src/models/extra/typesense.model';
import {AsyncThunk} from '@reduxjs/toolkit';
import {RootState} from 'src/store/store';
import {FilterObject, PaginationParams} from 'src/shared/advancedComponents/typesenseInfiniteList/types';


//hook

export interface useTypesenseInfiniteListWithStoreParams<T> {
    col: TypesenseCollections
    fetchAction:  AsyncThunk<any, GetPaginatedListWithStoreParams<T>, any>
    selectorMethod: (state: RootState) => T[]
    isLoadingSelectorMethod: (state: RootState) => boolean
    pageSelectorMethod: (state: RootState) => number
    orderValue: keyof T
    keyExtractorKey: keyof T
    pageSize?: number
    searchTextParam?: string
    filterBy?: FilterObject[]
}

// service
export interface GetPaginatedListWithStoreParams<T> {
    col: TypesenseCollections
    orderValue: (keyof T)
    paginationParams: PaginationParams
    getFirstPage?: boolean
}
