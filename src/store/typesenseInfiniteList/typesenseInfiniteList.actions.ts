import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetPaginatedListWithStoreParams} from 'src/shared/advancedComponents/typesenseInfiniteListWithStore/types';
import {typesenseInfiniteListService} from 'src/shared/advancedComponents/typesenseInfiniteList/service/typesenseInfiniteList.service';

const typesenseInfiniteListActionNames = createActionTypesMap(
  'typesenseInfiniteList',
  ['fetchData'],
);

export const fetchData = <T>() =>
  createAsyncThunk<
    {data: T[]; getFirstPage?: boolean},
    GetPaginatedListWithStoreParams<T>,
    any
  >(typesenseInfiniteListActionNames.fetchData, async (params, thunkAPI) => {
    try {
      const data = await typesenseInfiniteListService.getPaginatedList(params);
      return {
        data,
        getFirstPage: params.getFirstPage || false,
      };
    } catch (e: any) {
      throw new Error(`saveSession error', ${(e as any).message}`);
    }
  });
export const typesenseInfiniteListActions = {
  fetchData,
};
