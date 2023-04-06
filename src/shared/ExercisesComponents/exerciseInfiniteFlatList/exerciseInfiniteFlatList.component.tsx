import React, {FC} from 'react';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import {ExerciseItem} from 'src/screens/app/exercises/components/exerciseItem/exerciseItem.component';
import {FilterObject} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';
import ImageNoData from 'assets/no_data.svg';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';
import {Logger} from 'src/utils/logger';
import {ExerciseHeader} from 'src/screens/app/exercises/components/exerciseHeader/exerciseHeader.component';

export interface ExerciseInfiniteFlatListProps {
    onItemPress: (exercise: ExerciseModel) => void;
}

const logger = new Logger('ExerciseInfiniteFlatList');
export const ExerciseInfiniteFlatList: FC<
    ExerciseInfiniteFlatListProps
> = props => {
    const [searchTextParam, setSearchTextParam] = React.useState<
        string | undefined
    >(undefined);

    const [filterByMuscle, setFilterByMuscle] = React.useState<FilterObject>({
        field: `primaryMuscles.name`,
        operator: 'CONTAINS[c]',
        value: [],
    });

    const realmHookParams = useRealmList<ExerciseSchema, ExerciseModel>({
        schema: ExerciseSchema,
        keyExtractorKey: 'id',
        searchTextParam: searchTextParam,
        searchField: 'name',
        filterBy: [filterByMuscle],
    });

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
        <>
            <ExerciseHeader
                setSearchTextParam={setSearchTextParam}
                filterByMuscle={filterByMuscle}
                setFilterByMuscle={setFilterByMuscle}
            />
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
        </>
    );
};
