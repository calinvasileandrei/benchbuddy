import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {ExerciseWorkoutModel} from 'src/models/schema/exerciseWorkout.model';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {WorkoutModel} from 'src/models/schema/workout.model';

const exerciseToLineChart = (workout: ExerciseWorkoutModel): LineChartData => {
    const getLabels = () => {
        return workout.exerciseSets.map(
            exercise => `set ${exercise.setNumber + 1}`,
        );
    };

    return {
        datasets: [
            {
                data: workout.exerciseSets.map(exercise => exercise.weight),
            },
        ],
        labels: getLabels(),
    };
};

const getPieMuscleOverviewData = ({
    workoutSession,
    workoutModel,
}: {
    workoutSession?: WorkoutSessionModel;
    workoutModel?: WorkoutModel;
}): {name: string; data: {name: string; count: number}[]}[] => {
    const primaryMuscles = new Map<string, number>();
    const secondaryMuscles = new Map<string, number>();

    const toCycle = workoutModel
        ? workoutModel.exercises
        : workoutSession?.sessionExercises || [];

    toCycle.forEach(sessionExercise => {
        sessionExercise.exercise.secondaryMuscles.forEach(secondaryMuscle => {
            const muscleName = secondaryMuscle.name;
            const count = secondaryMuscles.get(muscleName) || 0;
            secondaryMuscles.set(muscleName, count + 1);
        });
        sessionExercise.exercise.primaryMuscles.forEach(primaryMuscle => {
            const muscleName = primaryMuscle.name;
            const count = primaryMuscles.get(muscleName) || 0;
            primaryMuscles.set(muscleName, count + 1);
        });
    });

    const getArray = (
        map: Map<string, number>,
    ): {name: string; count: number}[] => {
        return [...map.entries()].map(item => {
            return {
                name: item[0],
                count: item[1],
            };
        });
    };

    return [
        {name: 'Primary Muscles overview', data: getArray(primaryMuscles)},
        {name: 'Secondary Muscles overview', data: getArray(secondaryMuscles)},
    ];
};

export const workoutToChartUtils = {
    exerciseToLineChart,
    getPieMuscleOverviewData,
};
