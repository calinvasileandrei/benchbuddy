import {TypesenseCollections} from 'src/models/extra/typesense.model';

export interface FetchMoreDataParams {
    getFirstPage: boolean;
}

export interface FetchMoreDataWithSearchParams {
    getFirstPage: boolean;
    searchTextParam?: string;
}

export interface FilterObject {
    field: string;
    operator: string;
    value: (string | number)[];
}

//hook
export interface useTypesenseInfiniteListReturn<T> {
    data: T[];
    keyExtractor: (item: T) => string;
    fetchMoreData: (params?: FetchMoreDataParams) => void;
    pageSize: number;
    isLoading: boolean;
}

export interface useTypesenseInfiniteListParams<T> {
    col: TypesenseCollections;
    orderValue: keyof T;
    keyExtractorKey: keyof T;
    pageSize?: number;
    searchTextParam?: string;
    filterBy?: FilterObject[];
}

// component
export interface TypesenseInfiniteListProps<T> {
    typesenseHookParams: useTypesenseInfiniteListReturn<T>;
    renderItem: (item: T) => any;
    emptyList?: {
        message?: string;
        image?: any;
        imageStyle?: {
            width: number;
            height: number;
        };
    };
}

// service
export interface GetPaginatedListParams<T> {
    col: TypesenseCollections;
    orderValue: keyof T;
    paginationParams: PaginationParams;
}

export interface PaginationParams {
    page: number;
    size: number;
    searchTextParam?: string;
    filterBy?: FilterObject[];
}
