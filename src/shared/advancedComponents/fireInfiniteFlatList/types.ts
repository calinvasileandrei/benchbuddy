
// hook
import {Collections} from 'src/services/types';
import {PaginationParams} from 'src/models/extra/pagination.model';

export interface useInfiniteFirestoreListParams<T> {
    col: Collections
    orderValue: keyof T
    keyExtractorKey: keyof T
    pageSize?: number
}

export interface FetchMoreDataParams {
    getFirstPage: boolean
}

export interface useInfiniteFirestoreListReturn<T> {
    data: T[]
    keyExtractor: (item: T) => string
    fetchMoreData: (params?: FetchMoreDataParams) => void
    pageSize: number
    isLoading:boolean
}



//component
export interface FireInfiniteFlatListProps<T> {
    fireHookParams: useInfiniteFirestoreListReturn<T>;
    renderItem: (item: T) => any;
    searchTextParam?: string;


}
// service

export interface GetPaginatedListParams<T> {
    col: Collections
    orderValue: (keyof T)
    paginationParams: PaginationParams
}

