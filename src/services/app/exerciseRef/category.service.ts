import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {CategoryModel} from 'src/models/schema/exerciseRef/category.model';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('CategoryService');
const save = async (data: CategoryModel[]) => {
  try {
    const promises = data.map(item =>
      firestore()
        .collection(Collections.CATEGORY)
        .doc(item.id)
        .set({
          ...item,
        }),
    );
    await Promise.all(promises);
    logger.debug('Save Category completed');
  } catch (e) {
    logger.debug('Save Category error: ', e);
  }
};

export const CategoryService = {
  save,
};
