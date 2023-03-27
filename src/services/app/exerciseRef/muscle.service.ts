import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {MuscleModel} from 'src/models/schema/exerciseRef/muscle.model';
import firestore from '@react-native-firebase/firestore';
import {myFirestoreService} from 'src/services/firestoreService/myFirestore.service';

const logger = new Logger('MuscleService');
const save = async (muscles: MuscleModel[]) => {
    try {
        const promises = muscles.map(item =>
            firestore()
                .collection(Collections.MUSCLES)
                .doc(item.id)
                .set({
                    ...item,
                }),
        );
        await Promise.all(promises);
        logger.debug('Save muscles completed');
    } catch (e) {
        logger.debug('Save muscles error: ', e);
    }
};

const getAll = async (): Promise<MuscleModel[]> => {
    return await myFirestoreService.getCollection({
        collection: Collections.MUSCLES,
        methodName: 'getMuscles',
    });
};

export const MuscleService = {
    save,
    getAll,
};
