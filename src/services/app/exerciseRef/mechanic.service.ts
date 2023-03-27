import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {MechanicModel} from 'src/models/schema/exerciseRef/mechanic.model';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('MechanicService');
const save = async (data: MechanicModel[]) => {
  try {
    const promises = data.map(item =>
      firestore()
        .collection(Collections.MECHANIC)
        .doc(item.id)
        .set({
          ...item,
        }),
    );
    await Promise.all(promises);
    logger.debug('Save Mechanic completed');
  } catch (e) {
    logger.debug('Save Mechanic error: ', e);
  }
};

export const MechanicService = {
  save,
};
