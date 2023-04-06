import {Logger} from 'src/utils/logger';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import {
    MuscleModel,
    MuscleSchema,
} from 'src/models/schema/exerciseRef/muscle.model';

const logger = new Logger('ExerciseListService');

const exportExercises = async () => {
    try {
        logger.debug('Exporting exercises, loading data...');

        const exercisesArray = require('exports/exportDir/exercises.json');
        const categoryArray = require('exports/exportDir/category.json');
        const equipmentArray = require('exports/exportDir/equipment.json');
        const forceArray = require('exports/exportDir/force.json');
        const levelArray = require('exports/exportDir/level.json');
        const mechanicArray = require('exports/exportDir/mechanic.json');
        const muscleArray = require('exports/exportDir/muscle.json');

        logger.debug('Data loaded,ready to save');

        /*        await exerciseService.saveExercises(exercisesArray);
        logger.debug('Export exercises completed');
        await ForceService.save(forceArray);
        logger.debug('Export force completed');
        await LevelService.save(levelArray);
        logger.debug('Export level completed');
        await MechanicService.save(mechanicArray);
        logger.debug('Export mechanic completed');
        await EquipmentService.save(equipmentArray);
        logger.debug('Export equipment completed');
        await MuscleService.save(muscleArray);
        logger.debug('Export muscle completed');
        await CategoryService.save(categoryArray);
        logger.debug('Export category completed');*/

        logger.debug('EXPORT COMPLETED!');
    } catch (e) {
        logger.error('Error importing json files', e);
        return null;
    }
};

const populateRealmExercises = (realm: Realm) => {
    populateRealmMuscles(realm);
    const data: ExerciseModel[] =
        require('exports/exportDir/exercises.json') as ExerciseModel[];

    realm.write(() => {
        const allItems = realm.objects(ExerciseSchema.schema.name);
        realm.delete(allItems);
    });
    logger.debug(
        '[populate exercises] delete complete of number of items: ',
        data.length,
    );

    realm.write(() => {
        data.map(item => {
            const primaryMuscles: MuscleSchema[] = item.primaryMuscles.map(
                m =>
                    realm.objectForPrimaryKey(
                        MuscleSchema.schema.name,
                        m.id,
                    ) as MuscleSchema,
            );
            const secondaryMuscles: MuscleSchema[] = item.secondaryMuscles.map(
                m =>
                    realm.objectForPrimaryKey(
                        MuscleSchema.schema.name,
                        m.id,
                    ) as MuscleSchema,
            );

            new ExerciseSchema(realm, {
                id: item.id,
                name: item.name,
                secondaryMuscles: secondaryMuscles,
                primaryMuscles: primaryMuscles,
                mechanic: item.mechanic,
                force: item.force,
                category: item.category,
                instructions: item.instructions,
                level: item.level,
                equipment: item.equipment,
                owner: 'benchbuddy',
            });
        });
    });
    logger.debug(
        '[populate exercises] completed, number of items: ',
        data.length,
    );
};

const populateRealmMuscles = (realm: Realm) => {
    const data: MuscleModel[] =
        require('exports/exportDir/muscle.json') as MuscleModel[];

    realm.write(() => {
        const allItems = realm.objects(MuscleSchema.schema.name);
        realm.delete(allItems);
    });
    logger.debug(
        '[populate muscles] delete complete of number of items: ',
        data.length,
    );

    realm.write(() => {
        data.map(item => {
            new MuscleSchema(realm, {
                id: item.id,
                name: item.name,
            });
        });
    });
    logger.debug(
        '[populate muscles] completed, number of items: ',
        data.length,
    );
};

export const exerciseListService = {
    exportExercises,
    populateRealmExercises,
    populateRealmMuscles,
};
