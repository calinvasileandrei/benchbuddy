import React, {FC} from 'react';
import {ExerciseModel, ExerciseSchema} from 'src/models/schema/exercise.model';
import {ExerciseItem} from 'src/screens/app/exercises/components/exerciseItem/exerciseItem.component';
import {RealmList} from 'src/shared/advancedComponents/realmList/realmList.component';
import ImageNoData from 'assets/no_data.svg';
import {useRealmList} from 'src/shared/advancedComponents/realmList/useRealmList.hook';
import {Logger} from 'src/utils/logger';
import {ExerciseHeader} from 'src/screens/app/exercises/components/exerciseHeader/exerciseHeader.component';
import {FilterObject} from 'src/models/generalTypes';
import {useRealm} from 'src/services/realm.config';
import {RealmSubscriptions} from 'src/models/schema/realmTypes';

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
    const realm = useRealm();

    const [filterByMuscle, setFilterByMuscle] = React.useState<FilterObject>({
        field: `primaryMuscles.name`,
        operator: 'CONTAINS[c]',
        value: [],
    });

    const realmHookParams = useRealmList<ExerciseSchema, ExerciseModel>({
        schema: ExerciseSchema,
        keyExtractorKey: '_id',
        searchTextParam: searchTextParam,
        searchField: 'name',
        filterBy: [filterByMuscle],
        subscriptionName: RealmSubscriptions.EXERCISE,
    });

    const renderItem = (item: ExerciseModel) => {
        return (
            <ExerciseItem
                key={item._id}
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
