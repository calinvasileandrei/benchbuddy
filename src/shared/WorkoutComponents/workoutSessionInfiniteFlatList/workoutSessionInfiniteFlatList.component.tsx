import React, {FC} from 'react';
import {WorkoutHitSessionCard} from 'src/shared/WorkoutComponents/workoutHitSessionCard/workoutHitSessionCard.component';
import ImageSession from 'assets/session.svg';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';
import {
    WorkoutSessionModel,
    WorkoutSessionSchema,
} from 'src/models/schema/workoutSession.model';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';
import {FilterObject} from 'src/models/generalTypes';

export interface WorkoutSessionInfiniteFlatListProps {
    filterBy?: FilterObject[];
}

export const WorkoutSessionInfiniteFlatList: FC<
    WorkoutSessionInfiniteFlatListProps
> = props => {
    const realmHookParams = useRealmList<
        WorkoutSessionSchema,
        WorkoutSessionModel
    >({
        schema: WorkoutSessionSchema,
        keyExtractorKey: '_id',
        filterBy: props.filterBy,
        orderBy: {field: 'createdAt', reverse: true},
    });

    const renderItem = (item: WorkoutSessionModel) => {
        return (
            <WorkoutHitSessionCard
                key={item._id.toHexString()}
                workoutSession={item}
            />
        );
    };

    return (
        <RealmList
            realmHookParams={realmHookParams}
            renderItem={renderItem}
            emptyList={{
                image: ImageSession,
                message: "I see no workout session... it's time for gym!",
            }}
        />
    );
};
