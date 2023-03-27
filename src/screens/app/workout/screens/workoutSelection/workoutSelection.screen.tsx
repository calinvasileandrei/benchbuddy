import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {Logger} from 'src/utils/logger';
import {WorkoutCard} from 'src/shared/WorkoutComponents/workoutCard/workoutCard.component';
import {useFirestoreList} from 'src/shared/advancedComponents/fireList/hook/useFirestoreList.hook';
import {FireList} from 'src/shared/advancedComponents/fireList/fireList.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutStyle} from 'src/screens/app/workout/workout.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WorkoutRouteProp} from 'src/navigation/stacks/workout/types';
import {workoutActions} from 'src/store/workout/workout.actions';
import {workoutSelectors} from 'src/store/workout/workout.selectors';
import {AppRoutes} from 'src/navigation/routes';
import ImageNoData from 'assets/no_data.svg';
import {handleHaptic} from 'src/utils/haptics.utils';

export interface WorkoutSelectionScreenProps {}

const logger = new Logger('WorkoutScreen');
export const WorkoutSelectionScreen: FC<
    WorkoutSelectionScreenProps
> = props => {
    const style = useThemeStyle(workoutStyle);

    const navigation = useNavigation<any>();
    const route =
        useRoute<WorkoutRouteProp<AppRoutes.WORKOUT_SELECTION_SCREEN>>();

    const fireListHookParams = useFirestoreList<any>({
        fetchAction: workoutActions.getWorkouts,
        selectorMethod: workoutSelectors.getWorkouts,
        keyExtractorKey: '_id',
    });

    const handleSelectWorkout = (workout: WorkoutModel) => {
        route.params.setWorkout(workout);
        handleHaptic('success');
        navigation.goBack();
    };

    const renderWorkout = (workout: WorkoutModel) => {
        return (
            <WorkoutCard
                key={workout._id.toHexString()}
                workout={workout}
                onPress={handleSelectWorkout}
            />
        );
    };

    return (
        <MySafeAreaView edges={['bottom']}>
            <FireList
                fireHookParams={fireListHookParams}
                renderItem={renderWorkout}
                emptyList={{
                    image: ImageNoData,
                    imageStyle: {
                        width: 120,
                        height: 120,
                    },
                    message: "I can't find any workout",
                }}
            />
        </MySafeAreaView>
    );
};
