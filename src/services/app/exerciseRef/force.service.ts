import {Collections} from 'src/services/types';
import {ForceModel} from 'src/models/schema/exerciseRef/force.model';
import {Logger} from 'src/utils/logger';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('ForceService');
const save = async (data: ForceModel[]) => {
  try {
    const promises = data.map(item =>
      firestore()
        .collection(Collections.FORCE)
        .doc(item.id)
        .set({
          ...item,
        }),
    );
    await Promise.all(promises);
    logger.debug('Save Force completed');
  } catch (e) {
    logger.debug('Save Force error: ', e);
  }
};

export const ForceService = {
  save,
};
