// hook
import {RootState} from 'src/store/store';
import {AsyncThunk} from '@reduxjs/toolkit';

export interface useFirestoreListParams<T> {
    fetchAction: AsyncThunk<T[], void, any>;
    selectorMethod: (state: RootState) => T[];
    keyExtractorKey: keyof T;
}

export interface useFirestoreListReturn<T> {
    data: T[];
    fetchData: () => void;

    keyExtractor: (item: T) => string;

    isLoading: boolean;
}

// component

export interface FireListProps<T> {
    fireHookParams: useFirestoreListReturn<T>;
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
