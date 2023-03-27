import {WorkoutModel} from 'src/models/schema/workout.model';
import {Collections} from 'src/services/types';
import {UserService} from 'src/services/app/user.service';
import {Logger} from 'src/utils/logger';
import {myFirestoreService} from 'src/services/firestoreService/myFirestore.service';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const logger = new Logger('UserWorkoutService');

const saveUserWorkout = async (workout: WorkoutModel) => {
  const user = firebase.auth().currentUser;
  if (user?.uid) {
    return await myFirestoreService.updateDoc({
      collection: Collections.USERS,
      docId: user.uid,
      methodName: 'saveUserWorkout',
      data: {
        workouts: firestore.FieldValue.arrayUnion(workout),
      },
    });
  }
};

const getUserWorkouts = async (): Promise<WorkoutModel[]> => {
  logger.debug('getUserWorkouts');
  const user = await UserService.getUser();
  if (user && user.workouts) {
    logger.debug('getUserWorkouts workouts:', user.workouts);
    return user.workouts.reverse(); // reverse to have the last added at the top
  }
  logger.debug('getUserWorkouts no workouts');
  return [];
};

const deleteUserWorkout = async (workout: WorkoutModel) => {
  const user = firebase.auth().currentUser;
  if (user?.uid) {
    return await myFirestoreService.updateDoc({
      collection: Collections.USERS,
      docId: user.uid,
      methodName: 'deleteUserWorkout',
      data: {
        workouts: firestore.FieldValue.arrayRemove(workout),
      },
    });
  }
};

const deleteUserSessionWorkout = async (workoutSessionId: string) => {
  const user = firebase.auth().currentUser;
  if (user?.uid) {
    return await myFirestoreService.updateDoc({
      collection: Collections.USERS,
      docId: user.uid,
      methodName: 'deleteUserSessionWorkout',
      data: {
        workoutsSessions: firestore.FieldValue.arrayRemove(workoutSessionId),
      },
    });
  }
};

const saveUserWorkoutSession = async (workoutSessionId: string) => {
  const user = firebase.auth().currentUser;
  if (user?.uid) {
    return await myFirestoreService.updateDoc({
      collection: Collections.USERS,
      docId: user.uid,
      methodName: 'deleteUserSessionWorkout',
      data: {
        workoutsSessions: firestore.FieldValue.arrayUnion(workoutSessionId),
      },
    });
  }
};

const getUserWorkoutSessionsIds = async (): Promise<string[]> => {
  const user = await UserService.getUser();
  if (user && user.workoutsSessions) {
    logger.debug('getUserWorkouts workouts:', user.workoutsSessions);
    return user.workoutsSessions;
  }
  logger.debug('getUserWorkouts no workouts');
  return [];
};

const editUserWorkout = async (
  workoutToDelete: WorkoutModel,
  workoutToAdd: WorkoutModel,
) => {
  await deleteUserWorkout(workoutToDelete);
  await saveUserWorkout(workoutToAdd);
  logger.debug('editUserWorkout done', workoutToAdd);
};

export const UserWorkoutService = {
  getUserWorkouts,
  saveUserWorkout,
  deleteUserWorkout,
  deleteUserSessionWorkout,
  saveUserWorkoutSession,
  getUserWorkoutSessionsIds,
  editUserWorkout,
};
