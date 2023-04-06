import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {WorkoutQuickLook} from 'src/screens/app/workout/components/workoutQuickLook/workoutQuickLook.component';
import {Logger} from 'src/utils/logger';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutStyle} from 'src/screens/app/workout/workout.style';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import {WorkoutInfiniteFlatList} from 'src/shared/WorkoutComponents/workoutInfiniteFlatList/workoutInfiniteFlatList.component';

export interface WorkoutScreenProps {}

const logger = new Logger('WorkoutScreen');
export const WorkoutScreen: FC<WorkoutScreenProps> = props => {
    const style = useThemeStyle(workoutStyle);
    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <MyHeader title={'Workout'} />
            <WorkoutQuickLook />
            <WorkoutInfiniteFlatList />
        </MySafeAreaView>
    );
};
