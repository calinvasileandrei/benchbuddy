import React, {FC, useEffect} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useRoute} from '@react-navigation/native';
import {ExerciseRouteProp} from 'src/navigation/stacks/exercises/types';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {exerciseDetailStyle} from 'src/screens/app/exercises/screens/exerciseDetail/exerciseDetail.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {MyScrollView} from 'src/shared/baseComponents/myScrollView/myScrollView.component';
import {MyChip} from 'src/shared/baseComponents/myChip/myChip.component';
import {ScrollView} from 'react-native';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {MuscleModel} from 'src/models/schema/exerciseRef/muscle.model';
import {stringUtils} from 'src/utils/string.utils';
import {AppRoutes} from 'src/navigation/routes';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';

export interface ExerciseDetailScreenProps {}

export const ExerciseDetailScreen: FC<ExerciseDetailScreenProps> = props => {
    const style = useThemeStyle(exerciseDetailStyle);
    const route =
        useRoute<ExerciseRouteProp<AppRoutes.EXERCISE_DETAIL_SCREEN>>();
    const [muscles, setMuscles] = React.useState<MuscleModel[]>([]);
    const {exercise} = route.params;

    useEffect(() => {
        const fetchExercise = async () => {
            setMuscles([
                ...(exercise?.primaryMuscles || []),
                ...(exercise?.secondaryMuscles || []),
            ]);
        };
        fetchExercise();
    }, []);

    const renderChip = (item: MuscleModel) => {
        const title = stringUtils.capitalizeFirstLetter(item.name);
        if (title === '') {
            return null;
        }
        return <MyChip key={item.name} title={title} />;
    };

    if (!exercise) {
        return <MyLoading />;
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyScrollView title={exercise?.name}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={{alignItems: 'center'}}>
                    {muscles?.map(renderChip)}
                </ScrollView>
                <MyCard title={'Description'}>
                    <MyText>{exercise?.instructions}</MyText>
                </MyCard>
            </MyScrollView>
        </MySafeAreaView>
    );
};
