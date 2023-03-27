import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {ExerciseHeader} from 'src/screens/app/exercises/components/exerciseHeader/exerciseHeader.component';
import {
    ExerciseInfiniteFlatList
} from 'src/shared/ExercisesComponents/exerciseInfiniteFlatList/exerciseInfiniteFlatList.component';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {ExerciseHitModel} from 'src/models/schema/exercise.model';
import {exerciseSelectionStyle} from 'src/screens/app/exercises/screens/exerciseSelection/exerciseSelection.style';
import {WorkoutRouteProp} from 'src/navigation/stacks/workout/types';
import {AppRoutes} from 'src/navigation/routes';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {ExerciseCollectionFields} from 'src/models/extra/typesense.model';
import {exerciseService} from 'src/services/app/exercise.service';
import {ActivityIndicator, View} from 'react-native';

export interface WorkoutExerciseSelectionScreenProps {
}

export const ExerciseSelectionScreen: FC<WorkoutExerciseSelectionScreenProps> = (props) => {
    const style = useThemeStyle(exerciseSelectionStyle)
    const navigation = useNavigation<any>();
    const route = useRoute<WorkoutRouteProp<AppRoutes.EXERCISES_SELECTION_SCREEN>>()

    const [searchTextParam, setSearchTextParam] = React.useState<string | undefined>(undefined);
    const [filterByMuscle, setFilterByMuscle] = React.useState<FilterObject>({
        field: ExerciseCollectionFields.PRIMARY_MUSCLES,
        value: []
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleSelectWorkout = async (exerciseHit: ExerciseHitModel) => {
        setIsLoading(true)
        const exercise = await exerciseService.getExerciseById(exerciseHit.id)
        route.params.setExercises(exercise)
        setIsLoading(false)
        navigation.goBack()
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            {isLoading ?
                <View style={style.container}>
                    <ActivityIndicator size={'large'}/>
                </View>
                :
                <>
                    <ExerciseHeader setSearchTextParam={setSearchTextParam} filterByMuscle={filterByMuscle}
                                    setFilterByMuscle={setFilterByMuscle}/>
                    <ExerciseInfiniteFlatList onItemPress={handleSelectWorkout} searchTextParam={searchTextParam}
                                              filterBy={[filterByMuscle]}/>
                </>
            }
        </MySafeAreaView>
    );
};
