import {useEffect} from 'react';
import {
    FetchMoreDataParams,
    useTypesenseInfiniteListParams,
    useTypesenseInfiniteListReturn,
} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {typesenseInfiniteListSelectors} from 'src/store/typesenseInfiniteList/typesenseInfiniteList.selectors';
import {typesenseInfiniteListSliceActions} from 'src/store/typesenseInfiniteList/typesenseInfiniteList.slice';
import {typesenseInfiniteListActions} from 'src/store/typesenseInfiniteList/typesenseInfiniteList.actions';
import {Logger} from 'src/utils/logger';

const logger = new Logger('useTypesenseInfiniteList');
export const useTypesenseInfiniteList = <T>({
    col,
    pageSize,
    keyExtractorKey,
    orderValue,
    searchTextParam,
    filterBy,
}: useTypesenseInfiniteListParams<T>): useTypesenseInfiniteListReturn<T> => {
    const dispatch = useAppDispatch();
    const {isLoading, defaultPageSize, page, data, ...typesenseStore} =
        useAppSelector(typesenseInfiniteListSelectors.getStore);

    useEffect(() => {
        if (pageSize) {
            dispatch(
                typesenseInfiniteListSliceActions.setDefaultPageSize(pageSize),
            );
        }

        if (data) {
            logger.debug('resetting data on first mount');
            dispatch(typesenseInfiniteListSliceActions.reset());
        }

        return () => {
            logger.debug('resetting data on unmount');
            dispatch(typesenseInfiniteListSliceActions.reset());
        };
    }, []);

    useEffect(() => {
        fetchMoreData({getFirstPage: true});
    }, [typesenseStore.searchParameter, typesenseStore.filterBy]);

    useEffect(() => {
        dispatch(
            typesenseInfiniteListSliceActions.setSearchParameter(
                searchTextParam,
            ),
        );
        dispatch(typesenseInfiniteListSliceActions.setFilterBy(filterBy));
    }, [searchTextParam, filterBy]);

    const keyExtractor = (item: T) => `${item[keyExtractorKey]}`;

    const fetchMoreData = async (params: FetchMoreDataParams | undefined) => {
        const newPage = params?.getFirstPage ? 1 : page + 1;
        await dispatch(
            typesenseInfiniteListActions.fetchData<T>()({
                col,
                orderValue,
                getFirstPage: params?.getFirstPage,
                paginationParams: {
                    page: newPage,
                    size: defaultPageSize,
                    searchTextParam: typesenseStore.searchParameter,
                    filterBy: typesenseStore.filterBy,
                },
            }),
        );
    };

    return {
        data,
        keyExtractor,
        fetchMoreData,
        pageSize: defaultPageSize,
        isLoading,
    };
};
