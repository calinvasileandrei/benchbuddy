import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';

export interface ExerciseSetModel {
    setNumber: number;
    reps: number;
    weight: number;
    rest: number;
    isWarmup: boolean;
}

export class ExerciseSetSchema extends Realm.Object<ExerciseSetSchema> {
    setNumber!: number;
    reps!: number;
    weight!: number;
    rest!: number;
    isWarmup!: boolean;
    static schema = {
        name: RealmCollections.EXERCISE_SET,
        embedded: true,
        properties: {
            setNumber: 'int',
            reps: 'int',
            weight: 'int',
            rest: 'int',
            isWarmup: 'bool',
        },
    };
}
