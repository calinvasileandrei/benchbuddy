import React, {FC} from 'react';
import {TypesenseInfiniteList} from 'src/shared/advancedComponents/typesenseInfiniteList/typesenseInfiniteList.component';
import {TypesenseCollections} from 'src/models/extra/typesense.model';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {WorkoutSessionHitModel} from 'src/models/typesense/workoutSession.schema';
import {WorkoutHitSessionCard} from 'src/shared/WorkoutComponents/workoutHitSessionCard/workoutHitSessionCard.component';
import {useTypesenseInfiniteListWithStore} from 'src/shared/advancedComponents/typesenseInfiniteListWithStore/hook/useTypesenseInfiniteListWithStore.hook';
import {workoutSessionInfiniteListSelectors} from 'src/store/workoutSessionInfiniteList/workoutSessionInfiniteList.selectors';
import {workoutSessionInfiniteListActions} from 'src/store/workoutSessionInfiniteList/workoutSessionInfiniteList.actions';
import ImageSession from 'assets/session.svg';

export interface WorkoutSessionInfiniteFlatListProps {
    filterBy?: FilterObject[];
}

export const WorkoutSessionInfiniteFlatList: FC<
    WorkoutSessionInfiniteFlatListProps
> = props => {
    const typesenseExerciseList =
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
        });

    const renderItem = (item: WorkoutSessionHitModel) => {
        return <WorkoutHitSessionCard key={item.id} workoutSession={item} />;
    };

    return (
        <TypesenseInfiniteList
            typesenseHookParams={typesenseExerciseList}
            renderItem={renderItem}
            emptyList={{
                image: ImageSession,
                message: "I see no workout sessions... it's time for gym!",
            }}
        />
    );
};
