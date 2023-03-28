import React, {FC} from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {ExerciseHitModel} from 'src/models/schema/exercise.model';
import {exercisesItemStyle} from 'src/screens/app/exercises/components/exerciseItem/exerciseItem.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';

export interface ExerciseItemProps {
    exercise: ExerciseHitModel;
    onPress: (exercise: ExerciseHitModel) => void;
}

export const ExerciseItem: FC<ExerciseItemProps> = props => {
    const {exercise, onPress} = props;
    const style = useThemeStyle(exercisesItemStyle);

    return (
        <TouchableNativeFeedback
            key={exercise.id}
            onPress={() => onPress(exercise)}>
            <View style={style.container}>
                <MyText>{exercise.name}</MyText>
                <MyIcon
                    iconName={'chevron-forward-outline'}
                    color={style.icon.color}
                    size={18}
                />
            </View>
        </TouchableNativeFeedback>
    );
};
