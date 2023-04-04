import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {ExerciseModel} from 'src/models/schema/exercise.model';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {exercisesStyle} from 'src/screens/app/exercises/exercises.style';
import {ExerciseHeader} from 'src/screens/app/exercises/components/exerciseHeader/exerciseHeader.component';
import {ExerciseInfiniteFlatList} from 'src/shared/ExercisesComponents/exerciseInfiniteFlatList/exerciseInfiniteFlatList.component';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {ExerciseCollectionFields} from 'src/models/extra/typesense.model';
import {ExerciseStackNavigationProps} from 'src/navigation/stacks/exercises/types';

export interface ExercisesScreenProps {}

export const ExercisesScreen: FC<ExercisesScreenProps> = props => {
    const style = useThemeStyle(exercisesStyle);
    const navigation =
        useNavigation<
            ExerciseStackNavigationProps<AppRoutes.EXERCISE_DETAIL_SCREEN>
        >();

    const [searchTextParam, setSearchTextParam] = React.useState<
        string | undefined
    >(undefined);
    const [filterByMuscle, setFilterByMuscle] = React.useState<FilterObject>({
        field: `Exercise.primaryMuscles.name`,
        operator: 'IN',
        value: [],
    });

    const handleNavigateToDetail = (exercise: ExerciseModel) => {
        navigation.navigate(AppRoutes.EXERCISES_STACK, {
            screen: AppRoutes.EXERCISE_DETAIL_SCREEN,
            params: {exercise},
        });
    };

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <MyHeader title={'Exercises'} />
            <ExerciseHeader
                setSearchTextParam={setSearchTextParam}
                filterByMuscle={filterByMuscle}
                setFilterByMuscle={setFilterByMuscle}
            />
            <ExerciseInfiniteFlatList
                onItemPress={handleNavigateToDetail}
                searchTextParam={searchTextParam}
                filterBy={[filterByMuscle]}
            />
        </MySafeAreaView>
    );
};
