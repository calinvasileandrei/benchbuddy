import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {EquipmentModel} from 'src/models/schema/exerciseRef/equipment.model';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('EquipmentService');
const save = async (data: EquipmentModel[]) => {
    try {
        const promises = data.map(item =>
            firestore()
                .collection(Collections.EQUIPMENT)
                .doc(item.id)
                .set({
                    ...item,
                }),
        );
        await Promise.all(promises);
        logger.debug('Save Equipment completed');
    } catch (e) {
        logger.debug('Save Equipment error: ', e);
    }
};

export const EquipmentService = {
    save,
};
