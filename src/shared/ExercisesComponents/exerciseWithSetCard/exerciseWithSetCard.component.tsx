import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {ExerciseSetRow} from 'src/shared/ExercisesComponents/exercieseSetRow/ exerciseSetRow.component';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {ExerciseWorkoutModel} from 'src/models/schema/exerciseWorkout.model';
import {MenuMoreButton} from 'src/navigation/components/menuMoreButton/menuMoreButton.component';
import {exerciseWithSetCardStyle} from 'src/shared/ExercisesComponents/exerciseWithSetCard/exerciseWithSetCard.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {Logger} from 'src/utils/logger';

export interface ExerciseWithSetCardProps {
    exerciseWithSet?: ExerciseWorkoutModel;
    templateExerciseSets?: ExerciseWorkoutModel;
    onChange: (exercises: ExerciseSetModel[]) => void;
    deleteExercise?: () => void;
    withFastSet?: boolean;
}

const logger = new Logger('ExerciseWithSetCard');

export const ExerciseWithSetCard: FC<ExerciseWithSetCardProps> = props => {
    const {exerciseWithSet, templateExerciseSets} = props;
    const style = useThemeStyle(exerciseWithSetCardStyle);

    const [init, setInit] = useState<boolean>(false);
    const [sets, setSets] = useState<ExerciseSetModel[]>([]);
    const newSet = (setNumber: number): ExerciseSetModel => ({
        reps: 0,
        weight: 0,
        setNumber,
        isWarmup: false,
        rest: 0,
    });

    useEffect(() => {
        if (!init) {
            if (exerciseWithSet?.exerciseSets) {
                if (exerciseWithSet.exerciseSets.length === 0) {
                    setSets([newSet(0)]);
                } else {
                    setSets(exerciseWithSet.exerciseSets);
                }
            } else if (templateExerciseSets?.exerciseSets) {
                setSets(
                    templateExerciseSets.exerciseSets.map(s => ({
                        ...s,
                        rest: 0,
                        weight: 0,
                        reps: 0,
                    })),
                );
            }
            setInit(true);
        }
        props.onChange(sets);
    }, [sets]);

    const getCardMenu = () => {
        if (!props.deleteExercise) {
            return null;
        }
        return (
            <MenuMoreButton
                options={[
                    {
                        title: 'Delete',
                        iconName: 'trash-outline',
                        onPress: () =>
                            props.deleteExercise && props.deleteExercise(),
                    },
                ]}
            />
        );
    };

    const handleChangesOnSets = (newSets: ExerciseSetModel[]) => {
        const newSetsWithSetNumber = [...newSets].map((s, i) => ({
            ...s,
            setNumber: i,
        }));
        setSets(newSetsWithSetNumber);
    };

    const setExerciseSet = (set: ExerciseSetModel, index: number) => {
        const newObjects = [...sets];
        newObjects[index] = set;
        handleChangesOnSets(newObjects);
    };

    const handleRemoveSet = (index: number) => {
        if (index === 0 || !sets[index] || sets.length === 1) {
            return;
        }
        const newObjects = [...sets];
        newObjects.splice(index, 1);
        handleChangesOnSets(newObjects);
    };

    const handleAddSet = () => {
        const setId = sets.length ? sets.length : 0;
        const set = newSet(setId);
        handleChangesOnSets([...sets, set]);
    };

    const getPlaceHolderSet = (i: number) => {
        if (templateExerciseSets) {
            return templateExerciseSets.exerciseSets[i];
        }
    };

    const getName = () => {
        logger.debug('ExerciseWithSetCard', exerciseWithSet?.exercise);
        if (exerciseWithSet) {
            return exerciseWithSet?.exercise?.name;
        }
        if (templateExerciseSets) {
            return templateExerciseSets?.exercise?.name;
        }
        return 'Exercise';
    };

    return (
        <MyCard title={`${getName()}`} rightElement={getCardMenu()}>
            <View style={style.container}>
                <View style={style.exerciseSetCreatorContainer}>
                    {sets.map((set, i) => (
                        <ExerciseSetRow
                            key={i}
                            placeHolderSet={getPlaceHolderSet(i)}
                            exerciseSet={set}
                            setExerciseSet={setExerciseSet}
                            removeExerciseSet={handleRemoveSet}
                            setNumber={i}
                            withFastSet={props.withFastSet}
                        />
                    ))}
                </View>
                <View style={style.footer}>
                    <MyIcon
                        size={30}
                        onPress={handleAddSet}
                        iconName="add-circle"
                    />
                    <MyText type={'labelText'}>Add next set</MyText>
                </View>
            </View>
        </MyCard>
    );
};
