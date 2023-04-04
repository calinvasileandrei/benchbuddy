import React, {FC} from 'react';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import {ExerciseItem} from 'src/screens/app/exercises/components/exerciseItem/exerciseItem.component';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';
import ImageNoData from 'assets/no_data.svg';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';
import {useRealm} from 'src/services/realm.config';
import {Logger} from 'src/utils/logger';

export interface ExerciseInfiniteFlatListProps {
    onItemPress: (exercise: ExerciseModel) => void;
    searchTextParam?: string;
    filterBy?: FilterObject[];
}

const logger = new Logger('ExerciseInfiniteFlatList');
export const ExerciseInfiniteFlatList: FC<
    ExerciseInfiniteFlatListProps
> = props => {
    /*    const typesenseExerciseList = useTypesenseInfiniteList<ExerciseHitModel>({
        col: TypesenseCollections.EXERCISES,
        orderValue: 'name',
        keyExtractorKey: 'id',
        pageSize: 50,
        searchTextParam: props.searchTextParam,
        filterBy: props.filterBy,
    });*/
    const realmHookParams = useRealmList<ExerciseSchema, ExerciseModel>({
        schema: ExerciseSchema,
        keyExtractorKey: 'id',
        searchTextParam: props.searchTextParam,
        searchField: 'name',
        filterBy: props.filterBy,
    });
    const realm = useRealm();

    const renderItem = (item: ExerciseModel) => {
        return (
            <ExerciseItem
                key={item.id}
                exercise={item}
                onPress={props.onItemPress}
            />
        );
    };

    return (
        <RealmList
            realmHookParams={realmHookParams}
            renderItem={renderItem}
            emptyList={{
                image: ImageNoData,
                imageStyle: {
                    width: 120,
                    height: 120,
                },
                message: "I can't find any exercise",
            }}
        />
        /*
            <TypesenseInfiniteList
                typesenseHookParams={typesenseExerciseList}
                renderItem={renderItem}
            />
        */
    );
};
