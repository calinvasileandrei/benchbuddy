import {RootState} from 'src/store/store';

const getStore = (state: RootState) => state.typesenseInfiniteList;

export const typesenseInfiniteListSelectors = {
    getStore
}
