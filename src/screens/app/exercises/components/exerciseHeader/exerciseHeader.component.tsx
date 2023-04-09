import React, {FC, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {MySearchBar} from 'src/shared/baseComponents/mySearchBar/mySearchBar.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {exerciseHeaderStyle} from 'src/screens/app/exercises/components/exerciseHeader/exerciseHeader.style';
import {MyChip} from 'src/shared/baseComponents/myChip/myChip.component';
import {stringUtils} from 'src/utils/string.utils';
import {MuscleModel} from 'src/models/schema/exerciseRef/muscle.model';
import {FilterObject} from 'src/models/generalTypes';
import {useRealmMuscles} from 'src/hooks/realm/useRealmMuscles.hook';

export interface ExerciseHeaderProps {
    setSearchTextParam: (search?: string) => void;
    setFilterByMuscle: (filterBy: FilterObject) => void;
    filterByMuscle: FilterObject;
}

export const ExerciseHeader: FC<ExerciseHeaderProps> = props => {
    const realmMuscles = useRealmMuscles();
    const [muscles, setMuscles] = React.useState<MuscleModel[]>([]);

    const {setSearchTextParam} = props;
    const style = useThemeStyle(exerciseHeaderStyle);

    useEffect(() => {
        if (muscles.length === 0) {
            setMuscles(realmMuscles.getAll());
        }
    }, []);

    const handleSearch = (text: string) => {
        if (text === '') {
            setSearchTextParam(undefined);
            return;
        }
        setSearchTextParam(text);
    };

    const handleChipPress = (muscle: MuscleModel) => {
        if (props.filterByMuscle.value.includes(muscle.name)) {
            let newFilterBy: FilterObject = {
                field: props.filterByMuscle.field,
                value: props.filterByMuscle.value.filter(
                    (name: string | number) => name !== muscle.name,
                ),
                operator: props.filterByMuscle.operator,
            };
            props.setFilterByMuscle(newFilterBy);
        } else {
            let newFilterBy: FilterObject = {
                field: props.filterByMuscle.field,
                value: [...props.filterByMuscle.value, muscle.name],
                operator: props.filterByMuscle.operator,
            };
            props.setFilterByMuscle(newFilterBy);
        }
    };

    const renderChip = (muscle: MuscleModel) => {
        return (
            <MyChip
                key={muscle._id}
                title={stringUtils.capitalizeFirstLetter(muscle.name)}
                withHaptics={'impactMedium'}
                onPress={() => handleChipPress(muscle)}
            />
        );
    };

    return (
        <View>
            <MySearchBar
                delayMillis={50}
                onChange={handleSearch}
                withHaptics={'success'}
            />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={style.chipScrollViewContainer}
                contentContainerStyle={{alignItems: 'center'}}>
                {muscles?.map(renderChip)}
            </ScrollView>
        </View>
    );
};
