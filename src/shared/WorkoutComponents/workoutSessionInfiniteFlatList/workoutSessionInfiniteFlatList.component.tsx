import React, {FC} from 'react';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {WorkoutHitSessionCard} from 'src/shared/WorkoutComponents/workoutHitSessionCard/workoutHitSessionCard.component';
import ImageSession from 'assets/session.svg';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';
import {
    WorkoutSessionModel,
    WorkoutSessionSchema,
} from 'src/models/schema/workoutSession.model';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';

export interface WorkoutSessionInfiniteFlatListProps {
    filterBy?: FilterObject[];
}

export const WorkoutSessionInfiniteFlatList: FC<
    WorkoutSessionInfiniteFlatListProps
> = props => {
    /*    const typesenseExerciseList =
        useTypesenseInfiniteListWithStore<WorkoutSessionHitModel>({
            col: TypesenseCollections.WORKOUT_SESSIONS,
            isLoadingSelectorMethod:
                workoutSessionInfiniteListSelectors.getIsLoading,
            selectorMethod:
                workoutSessionInfiniteListSelectors.getWorkoutSessions,
            pageSelectorMethod: workoutSessionInfiniteListSelectors.getPage,
            fetchAction: workoutSessionInfiniteListActions.fetchData,
            orderValue: 'workoutName',
            keyExtractorKey: 'id',
            pageSize: 10,
            filterBy: props.filterBy,
        });*/

    const realmHookParams = useRealmList<
        WorkoutSessionSchema,
        WorkoutSessionModel
    >({
        schema: WorkoutSessionSchema,
        keyExtractorKey: 'id',
        filterBy: props.filterBy,
    });

    const renderItem = (item: WorkoutSessionModel) => {
        return <WorkoutHitSessionCard key={item.id} workoutSession={item} />;
    };

    return (
        <RealmList
            realmHookParams={realmHookParams}
            renderItem={renderItem}
            emptyList={{
                image: ImageSession,
                message: "I see no workout sessions... it's time for gym!",
            }}
        />
        /*        <TypesenseInfiniteList
                    typesenseHookParams={typesenseExerciseList}
                    renderItem={renderItem}
                    emptyList={{
                        image: ImageSession,
                        message: "I see no workout sessions... it's time for gym!",
                    }}
                />*/
    );
};
