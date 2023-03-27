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

export interface ExerciseModel {
    id: string;
    name: string;
    force: ForceModel;
    level: LevelModel;
    mechanic: MechanicModel;
    equipment: EquipmentModel;
    instructions: string;
    category: CategoryModel;
    primaryMuscles: MuscleModel[];
    secondaryMuscles: MuscleModel[];
}

export interface ExerciseHitModel {
    id: string;
    name: string;
    category: string;
}

export class ExerciseSchema extends Realm.Object<ExerciseModel> {
    id!: string;
    name!: string;
    force!: ForceSchema;
    mechanic!: MechanicSchema;
    level!: LevelSchema;
    equipment!: EquipmentSchema;
    instructions!: string;
    category!: CategorySchema;
    primaryMuscles!: Realm.List<MuscleSchema>;
    secondaryMuscles!: Realm.List<MuscleSchema>;
    static schema = {
        name: 'Exercise',
        properties: {
            id: 'string',
            name: 'string',
            force: 'Force',
            mechanic: 'Mechanic',
            level: 'Level',
            equipment: 'Equipment',
            instructions: 'string',
            category: 'Category',
            primaryMuscles: 'Muscle[]',
            secondaryMuscles: 'Muscle[]',
        },
        primaryKey: 'id',
    };
}

const getSecondaries = (item: any): any => {
    return {
        id: item.id,
        name: item.name,
    };
};

export const exerciseFromSchema = (
    exerciseSchema: ExerciseSchema,
): ExerciseModel => {
    return {
        id: exerciseSchema.id,
        name: exerciseSchema.name,
        force: getSecondaries(exerciseSchema.force),
        level: getSecondaries(exerciseSchema.level),
        mechanic: getSecondaries(exerciseSchema.mechanic),
        equipment: getSecondaries(exerciseSchema.equipment),
        instructions: exerciseSchema.instructions,
        category: getSecondaries(exerciseSchema.category),
        primaryMuscles: getSecondaries(exerciseSchema.primaryMuscles),
        secondaryMuscles: getSecondaries(exerciseSchema.secondaryMuscles),
    };
};
