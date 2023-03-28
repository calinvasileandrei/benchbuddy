import {Logger} from 'src/utils/logger';
import {exerciseService} from 'src/services/app/exercise.service';
import {ForceService} from 'src/services/app/exerciseRef/force.service';
import {CategoryService} from 'src/services/app/exerciseRef/category.service';
import {MuscleService} from 'src/services/app/exerciseRef/muscle.service';
import {EquipmentService} from 'src/services/app/exerciseRef/equipment.service';
import {MechanicService} from 'src/services/app/exerciseRef/mechanic.service';
import {LevelService} from 'src/services/app/exerciseRef/level.service';

const logger = new Logger('ExerciseListService');

const exportExercises = async () => {
    try {
        logger.debug('Exporting exercises, loading data...');

        const exercisesArray = require('../../../../exports/exportDir/exercises.json');
        const categoryArray = require('../../../../exports/exportDir/category.json');
        const equipmentArray = require('../../../../exports/exportDir/equipment.json');
        const forceArray = require('../../../../exports/exportDir/force.json');
        const levelArray = require('../../../../exports/exportDir/level.json');
        const mechanicArray = require('../../../../exports/exportDir/mechanic.json');
        const muscleArray = require('../../../../exports/exportDir/muscle.json');

        logger.debug('Data loaded,ready to save');

        await exerciseService.saveExercises(exercisesArray);
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
        logger.debug('Export category completed');

        logger.debug('EXPORT COMPLETED!');
    } catch (e) {
        logger.error('Error importing json files', e);
        return null;
    }
};

export const exerciseListService = {
    exportExercises,
};
