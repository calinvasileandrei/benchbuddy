import {ExerciseModel} from 'src/models/schema/exercise.model';
import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {myFirestoreService} from 'src/services/firestoreService/myFirestore.service';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('ExerciseService');

type ExerciseKeys = keyof ExerciseModel;

const saveExercises = async (exercises: ExerciseModel[]) => {
  try {
    const promises = exercises.map(exercise => {
      firestore()
        .collection(Collections.EXERCISES)
        .doc(exercise?.id)
        .set({
          ...exercise,
        });
    });
    await Promise.all(promises);
    logger.debug('Save exercises completed');
  } catch (e) {
    logger.debug('Save exercises error: ', e);
  }
};

export const getExerciseById = async (
  id: string,
): Promise<ExerciseModel | undefined> => {
  return await myFirestoreService.getDoc<ExerciseModel>({
    collection: Collections.EXERCISES,
    docId: id,
    methodName: 'getExerciseById',
  });
};

export const exerciseService = {
  saveExercises,
  getExerciseById,
};
