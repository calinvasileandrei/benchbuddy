import {
    ForceModel,
    ForceSchema,
} from 'src/models/schema/exerciseRef/force.model';
import {
    LevelModel,
    LevelSchema,
} from 'src/models/schema/exerciseRef/level.model';
import {
    MechanicModel,
    MechanicSchema,
} from 'src/models/schema/exerciseRef/mechanic.model';
import {
    EquipmentModel,
    EquipmentSchema,
} from 'src/models/schema/exerciseRef/equipment.model';
import {
    CategoryModel,
    CategorySchema,
} from 'src/models/schema/exerciseRef/category.model';
import {
    MuscleModel,
    MuscleSchema,
} from 'src/models/schema/exerciseRef/muscle.model';
import Realm from 'realm';
import {RealmCollections} from 'src/models/schema/realmTypes';

export interface ExerciseHitModel {
    id: string;
    name: string;
    category: string;
}

export interface ExerciseModel {
    id: string;
    name: string;
    force: ForceModel;
    mechanic: MechanicModel;
    level: LevelModel;
    equipment: EquipmentModel;
    instructions: string[];
    category: CategoryModel;
    primaryMuscles: MuscleModel[];
    secondaryMuscles: MuscleModel[];
    owner: string;
}

export class ExerciseSchema extends Realm.Object<ExerciseModel> {
    id!: string;
    name!: string;
    force!: ForceSchema;
    mechanic!: MechanicSchema;
    level!: LevelSchema;
    equipment!: EquipmentSchema;
    instructions!: string[];
    category!: CategorySchema;
    primaryMuscles!: Realm.List<MuscleSchema>;
    secondaryMuscles!: Realm.List<MuscleSchema>;
    owner!: string;

    static schema = {
        name: RealmCollections.EXERCISE,
        properties: {
            id: 'string',
            name: 'string',
            force: 'Force',
            mechanic: 'Mechanic',
            level: 'Level',
            equipment: 'Equipment',
            instructions: 'string[]',
            category: 'Category',
            primaryMuscles: 'Muscle[]',
            secondaryMuscles: 'Muscle[]',
            owner: 'string',
        },
        primaryKey: 'id',
    };
}
