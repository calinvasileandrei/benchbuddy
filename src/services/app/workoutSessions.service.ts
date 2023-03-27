import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {Collections} from 'src/services/types';
import {Logger} from 'src/utils/logger';
import {UserService} from 'src/services/app/user.service';
import {myFirestoreService} from 'src/services/firestoreService/myFirestore.service';

const logger = new Logger('WorkoutSessionsService');
const saveWorkoutSession = async (workoutSession: WorkoutSessionModel) => {
  return await myFirestoreService.setDoc({
    collection: Collections.WORKOUT_SESSION,
    docId: workoutSession.id,
    data: workoutSession,
    methodName: 'saveWorkoutSession',
  });
};

const getWorkoutSessionById = async (
  workoutSessionId: string,
): Promise<WorkoutSessionModel | undefined> => {
  return await myFirestoreService.getDoc<WorkoutSessionModel>({
    collection: Collections.WORKOUT_SESSION,
    docId: workoutSessionId,
    methodName: 'getWorkoutSessionById',
  });
};

const deleteWorkoutSession = async (workoutSessionId: string) => {
  return await myFirestoreService.deleteDoc({
    collection: Collections.WORKOUT_SESSION,
    docId: workoutSessionId,
    methodName: 'deleteWorkoutSession',
  });
};

export const workoutSessionsService = {
  saveWorkoutSession,
  deleteWorkoutSession,
  getWorkoutSessionById,
};
