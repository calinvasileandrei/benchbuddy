import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {LevelModel} from 'src/models/schema/exerciseRef/level.model';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('LevelService');
const save = async (data: LevelModel[]) => {
    try {
        const promises = data.map(item =>
            firestore()
                .collection(Collections.LEVEL)
                .doc(item.id)
                .set({
                    ...item,
                }),
        );
        await Promise.all(promises);
        logger.debug('Save Level completed');
    } catch (e) {
        logger.debug('Save Level error: ', e);
    }
};

export const LevelService = {
    save,
};
