var fs = require('fs');
var path = require('path');

const exercisesData = require('./exercises.json');

const exportToFile = async (obj, name) => {
    var json = JSON.stringify(obj);
    const newPath = path.join(__dirname, 'exportDir');
    fs.mkdir(newPath, {recursive: true}, err => {
        if (err) throw err;
    });

    fs.writeFile(`exportDir/${name}.json`, json, 'utf8', () => {
        console.log(`File ${name} saved`);
    });
};

const autoId = () => {
    const CHARS =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let autoId = '';

    for (let i = 0; i < 20; i++) {
        autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoId;
};
const getExerciseFromExerciseList = data => {
    const exercise = {
        id: autoId(),
        name: data.name,
        force: data.force,
        level: data.level,
        mechanic: data.mechanic,
        equipment: data.equipment,
        primaryMuscles: data.primaryMuscles,
        secondaryMuscles: data.secondaryMuscles,
        instructions: data.description,
        category: data.category,
    };
    return exercise;
};

const exportExercises = async () => {
    const exercisesRow = exercisesData.exercises;

    console.log('Export exercises started');
    console.log('Total exercises: ' + exercisesRow.length);

    const forceList = new Set([]);
    const levelList = new Set([]);
    const mechanicList = new Set([]);
    const equipmentList = new Set([]);
    const muscleList = new Set([]);
    const categoryList = new Set([]);

    exercisesRow.map(exercise => {
        if (exercise.force) forceList.add(exercise.force);
        levelList.add(exercise.level);
        if (exercise.mechanic) mechanicList.add(exercise.mechanic);
        if (exercise.equipment) equipmentList.add(exercise.equipment);
        exercise.primaryMuscles.forEach(muscle => muscleList.add(muscle));
        exercise.secondaryMuscles.forEach(muscle => muscleList.add(muscle));
        categoryList.add(exercise.category);

        return getExerciseFromExerciseList(exercise);
    });

    console.log('forceList size: ', forceList.size);
    console.log('levelList size: ', levelList.size);
    console.log('mechanicList size: ', mechanicList.size);
    console.log('equipmentList size: ', equipmentList.size);
    console.log('muscleList size: ', muscleList.size);
    console.log('categoryList size: ', categoryList.size);

    const forceArray = Array.from(forceList).map((force, index) => ({
        _id: index.toString(),
        name: force,
    }));
    const levelArray = Array.from(levelList).map((level, index) => ({
        _id: index.toString(),
        name: level,
    }));
    const mechanicArray = Array.from(mechanicList).map((mechanic, index) => ({
        _id: index.toString(),
        name: mechanic,
    }));
    const equipmentArray = Array.from(equipmentList).map(
        (equipment, index) => ({_id: index.toString(), name: equipment}),
    );
    const muscleArray = Array.from(muscleList).map((muscle, index) => ({
        _id: index.toString(),
        name: muscle,
    }));
    const categoryArray = Array.from(categoryList).map((category, index) => ({
        _id: index.toString(),
        name: category,
    }));

    console.log('Conversion to object completed');

    const exercises = exercisesRow.map(exercise => {
        const newExercise = {
            id: autoId(),
            name: exercise.name,
            force: forceArray.find(force => force.name === exercise.force),
            level: levelArray.find(level => level.name === exercise.level),
            mechanic: mechanicArray.find(
                mechanic => mechanic.name === exercise.mechanic,
            ),
            equipment: equipmentArray.find(
                equipment => equipment.name === exercise.equipment,
            ),
            instructions: exercise.instructions,
            category: categoryArray.find(
                category => category.name === exercise.category,
            ),
            primaryMuscles: exercise.primaryMuscles.map(muscle =>
                muscleArray.find(muscleItem => muscleItem.name === muscle),
            ),
            secondaryMuscles: exercise.secondaryMuscles.map(muscle =>
                muscleArray.find(muscleItem => muscleItem.name === muscle),
            ),
        };
        return newExercise;
    });

    console.log('Exercise created,ready to save');

    fs.rmdirSync('exportDir', {recursive: true});

    exportToFile(exercises, 'exercises');
    // await ExerciseService.saveExercises(exercises)
    console.log('Export exercises completed');

    exportToFile(forceArray, 'force');
    // await ForceService.save(forceArray)
    console.log('Export force completed');

    exportToFile(levelArray, 'level');
    // await LevelService.save(levelArray)
    console.log('Export level completed');

    exportToFile(mechanicArray, 'mechanic');
    // await MechanicService.save(mechanicArray)
    console.log('Export mechanic completed');

    exportToFile(equipmentArray, 'equipment');
    // await EquipmentService.save(equipmentArray)
    console.log('Export equipment completed');

    exportToFile(muscleArray, 'muscle');
    // await MuscleService.save(muscleArray)
    console.log('Export muscle completed');

    exportToFile(categoryArray, 'category');
    // await CategoryService.save(categoryArray)
    console.log('Export category completed');

    console.log('EXPORT COMPLETED!');
};

module.exports = {exportExercises};
