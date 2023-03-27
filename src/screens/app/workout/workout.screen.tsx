import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {WorkoutQuickLook} from 'src/screens/app/workout/components/workoutQuickLook/workoutQuickLook.component';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {Logger} from 'src/utils/logger';
import {WorkoutCard} from 'src/shared/WorkoutComponents/workoutCard/workoutCard.component';
import {useFirestoreList} from 'src/shared/advancedComponents/fireList/hook/useFirestoreList.hook';
import {FireList} from 'src/shared/advancedComponents/fireList/fireList.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutStyle} from 'src/screens/app/workout/workout.style';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import {workoutActions} from 'src/store/workout/workout.actions';
import {workoutSelectors} from 'src/store/workout/workout.selectors';
import ImageNoData from 'assets/no_data.svg';

export interface WorkoutScreenProps {
}

const logger = new Logger('WorkoutScreen')
export const WorkoutScreen: FC<WorkoutScreenProps> = (props) => {
    const style = useThemeStyle(workoutStyle)
    const fireListHookParams = useFirestoreList<WorkoutModel>({
        fetchAction: workoutActions.getWorkouts,
        selectorMethod: workoutSelectors.getWorkouts,
        keyExtractorKey: 'id'
    })

    const renderWorkout = (workout: WorkoutModel) => {
        return (
            <WorkoutCard key={workout.id} workout={workout}/>
        )
    }


    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <MyHeader title={'Workout'}/>
            <WorkoutQuickLook/>
            <FireList fireHookParams={fireListHookParams} renderItem={renderWorkout} emptyList={{
                image:ImageNoData,
                imageStyle:{
                    width: 120,
                    height: 120
                },
                message:"I can't find any workout"}}/>
        </MySafeAreaView>
    );
};
