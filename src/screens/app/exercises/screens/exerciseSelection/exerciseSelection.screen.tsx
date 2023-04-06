import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {ExerciseInfiniteFlatList} from 'src/shared/ExercisesComponents/exerciseInfiniteFlatList/exerciseInfiniteFlatList.component';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {ExerciseModel} from 'src/models/schema/exercise.model';
import {exerciseSelectionStyle} from 'src/screens/app/exercises/screens/exerciseSelection/exerciseSelection.style';
import {WorkoutRouteProp} from 'src/navigation/stacks/workout/types';
import {AppRoutes} from 'src/navigation/routes';

export interface WorkoutExerciseSelectionScreenProps {}

export const ExerciseSelectionScreen: FC<
    WorkoutExerciseSelectionScreenProps
> = props => {
    const style = useThemeStyle(exerciseSelectionStyle);
    const navigation = useNavigation<any>();
    const route =
        useRoute<WorkoutRouteProp<AppRoutes.EXERCISES_SELECTION_SCREEN>>();

    const handleSelectWorkout = async (exercise: ExerciseModel) => {
        route.params.setExercises(exercise);
        navigation.goBack();
    };

    return (
        <MySafeAreaView edges={['bottom']}>
            <ExerciseInfiniteFlatList onItemPress={handleSelectWorkout} />
        </MySafeAreaView>
    );
};
