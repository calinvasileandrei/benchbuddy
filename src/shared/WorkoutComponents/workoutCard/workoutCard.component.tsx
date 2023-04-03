import React, {FC} from 'react';
import {View} from 'react-native';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {Divider} from '@rneui/themed';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutCardStyle} from 'src/shared/WorkoutComponents/workoutCard/workoutCard.style';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {WorkoutStackNavigationProps} from 'src/navigation/stacks/workout/types';
import {useAppDispatch} from 'src/store/store';
import {workoutSliceActions} from 'src/store/workout/workout.slice';

export interface WorkoutCardProps {
    workout: WorkoutModel;
    onPress?: (workout: WorkoutModel) => void;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({workout, onPress}) => {
    const style = useThemeStyle(workoutCardStyle);
    const navigation =
        useNavigation<
            WorkoutStackNavigationProps<AppRoutes.WORKOUT_DETAIL_SCREEN>
        >();
    const dispatch = useAppDispatch();

    const handleNavigationToDetail = () => {
        dispatch(workoutSliceActions.setWorkoutProps({detailWorkout: workout}));
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.WORKOUT_DETAIL_SCREEN,
        });
    };

    const handleOnPress = () => {
        if (onPress) {
            return onPress(workout);
        }
        handleNavigationToDetail();
    };

    return (
        <MyCard
            key={workout._id.toHexString()}
            title={workout.name}
            onPress={handleOnPress}>
            {workout.description && (
                <MyText style={style.description}>{workout.description}</MyText>
            )}
            <Divider />
            <View style={style.exercises}>
                {workout?.exercises.map((exercise, index) => {
                    return (
                        <View style={style.item} key={index}>
                            <View style={style.roundContainer}>
                                <MyText
                                    type={'captionText'}
                                    style={style.exerciseNumber}>
                                    {`${(index + 1).toString()}`}
                                </MyText>
                            </View>
                            <MyText>{exercise.exercise?.name}</MyText>
                        </View>
                    );
                })}
            </View>
        </MyCard>
    );
};
