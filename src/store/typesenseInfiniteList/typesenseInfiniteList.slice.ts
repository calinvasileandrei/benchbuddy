import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {typesenseInfiniteListActions} from 'src/store/typesenseInfiniteList/typesenseInfiniteList.actions';

export interface TypesenseInfiniteListState<T> {
    data: T[];
    isLoading: boolean;
    page: number;
    defaultPageSize: number;
    //optional
    searchParameter?: string;
    filterBy?: FilterObject[];
    sortBy?: string;
}

const initialState: TypesenseInfiniteListState<any> = {
    data: [],
    defaultPageSize: 25,
    page: 1,
    isLoading: false
}

export const typesenseInfiniteListSlice = createSlice({
    name: 'typesenseInfiniteList',
    initialState,
    reducers: {
        setSearchParameter: (state, action: PayloadAction<string | undefined>) => {
            state.searchParameter = action.payload;
        },
        setFilterBy: (state, action: PayloadAction<FilterObject[] | undefined>) => {
            state.filterBy = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setDefaultPageSize: (state, action: PayloadAction<number>) => {
            state.defaultPageSize = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        reset: (state) => {
            state.data = []
            state.page = 1;
            state.isLoading = false;
            state.sortBy = undefined;
            state.filterBy = undefined;
            state.searchParameter = undefined;
            state.defaultPageSize = 25;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(typesenseInfiniteListActions.fetchData().pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(typesenseInfiniteListActions.fetchData().fulfilled, (state, action) => {
            const {data, getFirstPage} = action.payload
            const newPage = getFirstPage ? 1 : state.page + 1

            state.isLoading = false
            state.data = getFirstPage ? data : [...state.data, ...data]
            state.page = newPage
        })
    }
})

// Action creators are generated for each case reducer function
export const typesenseInfiniteListSliceActions = typesenseInfiniteListSlice.actions
export const typesenseInfiniteListReducer = typesenseInfiniteListSlice.reducer
