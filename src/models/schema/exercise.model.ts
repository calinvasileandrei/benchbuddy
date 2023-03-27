import firebase from 'firebase/compat';
import {firestoreUtils} from 'src/utils/firestore.utils';
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;
import {ForceModel} from 'src/models/schema/exerciseRef/force.model';
import {LevelModel} from 'src/models/schema/exerciseRef/level.model';
import {MechanicModel} from 'src/models/schema/exerciseRef/mechanic.model';
import {EquipmentModel} from 'src/models/schema/exerciseRef/equipment.model';
import {CategoryModel} from 'src/models/schema/exerciseRef/category.model';
import {MuscleModel} from 'src/models/schema/exerciseRef/muscle.model';

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


export const exerciseModelConverter: FirestoreDataConverter<ExerciseModel> = {
    toFirestore(exercise) {
        return {...exercise}
    },

    fromFirestore(snapshot,options) {
        const data = snapshot.data(options)!;
        return data as ExerciseModel;
    },
};

export const getExerciseFromExerciseList = (data: any): ExerciseModel => {
    const exercise: ExerciseModel = {
        id: firestoreUtils.autoId(),
        name: data.name,
        force: data.force,
        level: data.level,
        mechanic: data.mechanic,
        equipment: data.equipment,
        primaryMuscles: data.primaryMuscles,
        secondaryMuscles: data.secondaryMuscles,
        instructions: data.description,
        category: data.category,
    }
    return exercise;
}
