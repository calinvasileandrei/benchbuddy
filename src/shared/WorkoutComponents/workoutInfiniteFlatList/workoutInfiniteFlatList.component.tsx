import React, {FC} from 'react';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';
import {WorkoutModel, WorkoutSchema} from 'src/models/schema/workout.model';
import {WorkoutCard} from 'src/shared/WorkoutComponents/workoutCard/workoutCard.component';
import {Logger} from 'src/utils/logger';
import ImageNoData from 'assets/no_data.svg';
import {FilterObject} from 'src/models/generalTypes';

export interface WorkoutInfiniteFlatListProps {
    filterBy?: FilterObject[];
    onItemPress?: (workout: WorkoutModel) => void;
}

const logger = new Logger('WorkoutInfiniteFlatList');
export const WorkoutInfiniteFlatList: FC<
    WorkoutInfiniteFlatListProps
> = props => {
    const realmHookParams = useRealmList<WorkoutSchema, WorkoutModel>({
        schema: WorkoutSchema,
        keyExtractorKey: '_id',
        filterBy: props.filterBy,
        orderBy: {field: 'createdAt', reverse: true},
    });

    const renderWorkout = (workout: WorkoutModel) => {
        logger.debug('renderWorkout', workout);
        return (
            <WorkoutCard
                key={workout._id.toHexString()}
                workout={workout}
                onPress={props.onItemPress}
            />
        );
    };
    return (
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
    );
};
