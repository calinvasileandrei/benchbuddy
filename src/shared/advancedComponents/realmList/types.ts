// hook

import {FilterObject} from 'src/models/generalTypes';

export interface useRealmListParams<T, I> {
    schema: any;
    keyExtractorKey: keyof I;
    searchTextParam?: string;
    searchField?: keyof I;
    orderBy?: {
        field: keyof I;
        reverse?: boolean;
    };
    filterBy?: FilterObject[];
    subscriptionName?: string;
}

export interface useRealmListReturn<T, I> {
    data: I[];
    keyExtractor: (item: I) => string;
}

// component

export interface RealmListProps<T, I> {
    realmHookParams: useRealmListReturn<T, I>;
    renderItem: (item: any) => any;

    emptyList?: {
        message?: string;
        image?: any;
        imageStyle?: {
            width: number;
            height: number;
        };
    };
}
