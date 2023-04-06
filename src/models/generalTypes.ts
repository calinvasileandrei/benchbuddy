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
