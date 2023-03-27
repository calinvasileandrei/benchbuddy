import {useEffect, useState} from 'react';
import {useFirestoreListParams, useFirestoreListReturn} from 'src/shared/advancedComponents/fireList/types';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {Logger} from 'src/utils/logger';

const logger = new Logger('useFirestoreList.hook')
export const useFirestoreList = <T>({fetchAction,keyExtractorKey,selectorMethod}: useFirestoreListParams<T>):useFirestoreListReturn<T> => {
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const data:T[] = useAppSelector(selectorMethod)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data.length === 0) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        logger.debug('data changed',data)
    }, [data])

    const keyExtractor = (item: T) => item[keyExtractorKey] as unknown as string

    const fetchData = async () => {
        setIsLoading(true)
        await dispatch(fetchAction())
        setIsLoading(false)
    }

    return {
        data,
        keyExtractor,
        fetchData,
        isLoading
    }
}
