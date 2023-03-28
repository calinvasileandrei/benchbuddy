import {createSlice} from '@reduxjs/toolkit';
import {Logger} from 'src/utils/logger';
import {WorkoutSessionHitModel} from 'src/models/typesense/workoutSession.schema';
import {workoutSessionInfiniteListActions} from 'src/store/workoutSessionInfiniteList/workoutSessionInfiniteList.actions';

const logger = new Logger('workoutSessionInfiniteList.slice');

export interface WorkoutSessionInfiniteListState {
    workoutSessions: WorkoutSessionHitModel[];
    isLoading: boolean;
    page: number;
}

const initialState: WorkoutSessionInfiniteListState = {
    workoutSessions: [],
    isLoading: false,
    page: 0,
};

export const workoutSessionInfiniteListSlice = createSlice({
    name: 'workoutSessionInfiniteList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            workoutSessionInfiniteListActions.fetchData.pending,
            (state, action) => {
                state.isLoading = true;
            },
        );
        builder.addCase(
            workoutSessionInfiniteListActions.fetchData.fulfilled,
            (state, action) => {
                const {data, getFirstPage} = action.payload;
                const newPage = getFirstPage ? 1 : state.page + 1;

                state.isLoading = false;
                state.workoutSessions = getFirstPage
                    ? data
                    : [...state.workoutSessions, ...data];
                state.page = newPage;
            },
        );
        builder.addCase(
            workoutSessionInfiniteListActions.refreshData.fulfilled,
            (state, action) => {
                const data = action.payload;
                state.isLoading = false;
                state.workoutSessions = data;
                state.page = 1;
            },
        );
        builder.addCase(
            workoutSessionInfiniteListActions.refreshData.pending,
            (state, action) => {
                state.isLoading = true;
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const workoutSessionInfiniteListSliceActions =
    workoutSessionInfiniteListSlice.actions;
export const workoutSessionInfiniteListReducer =
    workoutSessionInfiniteListSlice.reducer;
