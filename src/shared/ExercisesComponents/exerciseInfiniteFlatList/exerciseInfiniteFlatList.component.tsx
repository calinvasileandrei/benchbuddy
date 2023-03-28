import React, {FC} from 'react';
import {ExerciseHitModel} from 'src/models/schema/exercise.model';
import {ExerciseItem} from 'src/screens/app/exercises/components/exerciseItem/exerciseItem.component';
import {TypesenseInfiniteList} from 'src/shared/advancedComponents/typesenseInfiniteList/typesenseInfiniteList.component';
import {useTypesenseInfiniteList} from 'src/shared/advancedComponents/typesenseInfiniteList/hook/useTypesenseInfiniteList.hook';
import {TypesenseCollections} from 'src/models/extra/typesense.model';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';

export interface ExerciseInfiniteFlatListProps {
    onItemPress: (exercise: ExerciseHitModel) => void;
    searchTextParam?: string;
    filterBy?: FilterObject[];
}

export const ExerciseInfiniteFlatList: FC<
    ExerciseInfiniteFlatListProps
> = props => {
    const typesenseExerciseList = useTypesenseInfiniteList<ExerciseHitModel>({
        col: TypesenseCollections.EXERCISES,
        orderValue: 'name',
        keyExtractorKey: 'id',
        pageSize: 50,
        searchTextParam: props.searchTextParam,
        filterBy: props.filterBy,
    });

    const renderItem = (item: ExerciseHitModel) => {
        return (
            <ExerciseItem
                key={item.id}
                exercise={item}
                onPress={props.onItemPress}
            />
        );
    };

    return (
        <TypesenseInfiniteList
            typesenseHookParams={typesenseExerciseList}
            renderItem={renderItem}
        />
    );
};
