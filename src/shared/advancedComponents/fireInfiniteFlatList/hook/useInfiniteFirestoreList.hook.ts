import React, {useEffect, useState} from 'react';
import {
    FetchMoreDataParams,
    useInfiniteFirestoreListParams, useInfiniteFirestoreListReturn
} from 'src/shared/advancedComponents/fireInfiniteFlatList/types';
import {getPaginatedList} from 'src/shared/advancedComponents/fireInfiniteFlatList/service/fireGetPaginateList.service';

export const useInfiniteFirestoreList = <T>({
                                                col,
                                                pageSize,
                                                keyExtractorKey,
                                                orderValue
                                            }: useInfiniteFirestoreListParams<T>):useInfiniteFirestoreListReturn<T> => {
    const [data, setData] = useState<T[]>([])
    const [page, setPage] = React.useState(0);
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const defaultPageSize = pageSize || 10

    useEffect(() => {
        if (data.length === 0) {
            fetchMoreData({getFirstPage: true})
        }
    }, [])

    const keyExtractor = (item: T) => `${item[keyExtractorKey]}`

    const fetchMoreData = async (params: FetchMoreDataParams | undefined) => {
        setIsLoading(true)

        const paginationParams = {
            page: params?.getFirstPage ? 0 : page,
            size: defaultPageSize,
            lastItem: params?.getFirstPage ? undefined : (data[data.length - 1] as any)[orderValue]
        }

        const newData = await getPaginatedList<T>({
            col,
            orderValue,
            paginationParams
        });

        if (params?.getFirstPage) {
            setData(newData)
            setPage(0)
            setIsLoading(false)
            return
        }
        setData([...data, ...newData])
        setPage(page + 1)
        setIsLoading(false)
    }

    return {
        data,
        keyExtractor,
        fetchMoreData,
        pageSize: defaultPageSize,
        isLoading
    }
}
