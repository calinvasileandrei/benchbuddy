import {useEffect} from 'react';
import {useTypesenseInfiniteListWithStoreParams} from '../types';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {
  FetchMoreDataWithSearchParams,
  useTypesenseInfiniteListReturn,
} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {Logger} from 'src/utils/logger';

const logger = new Logger('useTypesenseInfiniteListWithStore.hook');
export const useTypesenseInfiniteListWithStore = <T>({
  col,
  selectorMethod,
  pageSize,
  keyExtractorKey,
  orderValue,
  fetchAction,
  searchTextParam,
  filterBy,
  isLoadingSelectorMethod,
  pageSelectorMethod,
}: useTypesenseInfiniteListWithStoreParams<T>): useTypesenseInfiniteListReturn<T> => {
  const data: T[] = useAppSelector(selectorMethod);
  const isLoading: boolean = useAppSelector(isLoadingSelectorMethod);
  const page: number = useAppSelector(pageSelectorMethod);

  const dispatch = useAppDispatch();

  const defaultPageSize = pageSize || 25;

  useEffect(() => {
    logger.debug('useEffect [searchTextParam,filterBy]', searchTextParam);
    fetchMoreData({getFirstPage: true, searchTextParam});
  }, [searchTextParam, filterBy]);

  const keyExtractor = (item: T) => `${item[keyExtractorKey]}`;

  const fetchMoreData = async (
    params: FetchMoreDataWithSearchParams | undefined,
  ) => {
    const newPage = params?.getFirstPage ? 1 : page + 1;
    await dispatch(
      fetchAction({
        col,
        orderValue,
        getFirstPage: params?.getFirstPage,
        paginationParams: {
          page: newPage,
          size: defaultPageSize,
          searchTextParam: params?.searchTextParam,
          filterBy: filterBy,
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
