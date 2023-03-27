import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    typesenseInfiniteListWithStoreService
} from 'src/shared/advancedComponents/typesenseInfiniteListWithStore/service/typesenseInfiniteListWithStore.service';
import {WorkoutSessionHitModel} from 'src/models/typesense/workoutSession.schema';
import {GetPaginatedListWithStoreParams} from 'src/shared/advancedComponents/typesenseInfiniteListWithStore/types';
import {TypesenseCollections} from 'src/models/extra/typesense.model';

const workoutSessionActionNames = createActionTypesMap('workoutCreation', [
    'fetchData',
    'refreshData',
]);


export const fetchData = createAsyncThunk<{ data: WorkoutSessionHitModel[], getFirstPage?: boolean }, GetPaginatedListWithStoreParams<WorkoutSessionHitModel>, any>(workoutSessionActionNames.fetchData, async (params, thunkAPI) => {
    try {
        const data = await typesenseInfiniteListWithStoreService.getPaginatedList<WorkoutSessionHitModel>(params)

        return {
            data,
            getFirstPage: params.getFirstPage || false
        }
    } catch (e: any) {
        throw new Error('saveSession error', e.message)
    }
});

export const refreshData = createAsyncThunk<WorkoutSessionHitModel[], void, any>(workoutSessionActionNames.refreshData, async (params, thunkAPI) => {
    try {
        const data = await typesenseInfiniteListWithStoreService.getPaginatedList<WorkoutSessionHitModel>({
            col: TypesenseCollections.WORKOUT_SESSIONS,
            orderValue:'workoutName',
            paginationParams: {
                page: 1,
                size: 10,
                filterBy: []
            }
        })
        return data

    } catch (e: any) {
        throw new Error('saveSession error', e.message)
    }
});



export const workoutSessionInfiniteListActions = {
    fetchData,
    refreshData
}
