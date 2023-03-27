import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export enum Collections {
    USERS = 'users',
    EXERCISES = 'exercises',
    WORKOUT_SESSION = 'workoutSessions',

    MUSCLES = 'muscles',
    FORCE = 'force',
    LEVEL = 'level',
    EQUIPMENT = 'equipment',
    MECHANIC = 'mechanic',
    CATEGORY = 'category',
}

export type FirebaseDocumentData = FirebaseFirestoreTypes.DocumentData;
