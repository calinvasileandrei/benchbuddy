import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {WorkoutQuickLook} from 'src/screens/app/workout/components/workoutQuickLook/workoutQuickLook.component';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import {Logger} from 'src/utils/logger';
import {WorkoutCard} from 'src/shared/WorkoutComponents/workoutCard/workoutCard.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutStyle} from 'src/screens/app/workout/workout.style';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import ImageNoData from 'assets/no_data.svg';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';

export interface WorkoutScreenProps {}

const logger = new Logger('WorkoutScreen');
export const WorkoutScreen: FC<WorkoutScreenProps> = props => {
    const style = useThemeStyle(workoutStyle);

    const realmHookParams = useRealmList<WorkoutSchema, WorkoutModel>({
        schema: WorkoutSchema,
        keyExtractorKey: '_id',
    });

    const renderWorkout = (workout: WorkoutModel) => {
        logger.debug('renderWorkout', workout);
        return (
            <WorkoutCard key={workout._id.toHexString()} workout={workout} />
        );
    };

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <MyHeader title={'Workout'} />
            <WorkoutQuickLook />
            <RealmList
                realmHookParams={realmHookParams}
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
