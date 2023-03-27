// Create a configuration object
import {WorkoutSchema} from 'src/models/schema/workout.model';
import {createRealmContext} from '@realm/react';
import {ExerciseSchema} from 'src/models/schema/exercise.model';
import {ExerciseSetSchema} from 'src/models/schema/exerciseSet.model';
import {ExerciseWorkoutSchema} from 'src/models/schema/exerciseWorkout.model';
import {ForceSchema} from 'src/models/schema/exerciseRef/force.model';
import {MechanicSchema} from 'src/models/schema/exerciseRef/mechanic.model';
import {LevelSchema} from 'src/models/schema/exerciseRef/level.model';
import {EquipmentSchema} from 'src/models/schema/exerciseRef/equipment.model';
import {CategorySchema} from 'src/models/schema/exerciseRef/category.model';
import {MuscleSchema} from 'src/models/schema/exerciseRef/muscle.model';

const realmConfig: Realm.Configuration = {
    schema: [
        WorkoutSchema,
        ExerciseSchema,
        ExerciseWorkoutSchema,
        ExerciseSetSchema,
        ForceSchema,
        MechanicSchema,
        LevelSchema,
        EquipmentSchema,
        CategorySchema,
        MuscleSchema,
    ],
};

// Create a realm context
export const {RealmProvider, useRealm, useObject, useQuery} =
    createRealmContext(realmConfig);
