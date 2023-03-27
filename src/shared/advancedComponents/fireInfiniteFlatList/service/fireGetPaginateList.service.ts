import {collection, getDocs, limit, orderBy, query, startAfter} from 'firebase/firestore';
import {db} from 'src/services/firebaseConfig';
import {GetPaginatedListParams} from 'src/shared/advancedComponents/fireInfiniteFlatList/types';

export const getPaginatedList = async <T>({col, orderValue, paginationParams}: GetPaginatedListParams<T>) => {
    const ref = collection(db, col);
    const startPoint = paginationParams.lastItem || (paginationParams.page * paginationParams.size)
    const queryObj = query(ref, orderBy(orderValue as string), startAfter(startPoint), limit(paginationParams.size));
    const snapshot = await getDocs(queryObj);
    return snapshot.docs.map((doc) => doc.data() as T);
}

