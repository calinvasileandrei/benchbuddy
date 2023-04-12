import React, {FC} from 'react';
import {View} from 'react-native';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {Divider} from '@rneui/themed';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {workoutHitSessionCardStyle} from 'src/shared/WorkoutComponents/workoutHitSessionCard/workoutHitSessionCard.style';
import {WorkoutStackNavigationProps} from 'src/navigation/stacks/workout/types';
import {dateUtils} from 'src/utils/date.utils';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {workoutSliceActions} from 'src/store/workout/workout.slice';
import {useAppDispatch} from 'src/store/store';

export interface WorkoutHitSessionCardProps {
    workoutSession: WorkoutSessionModel;
    onPress?: (workoutSession: WorkoutSessionModel) => void;
}

export const WorkoutHitSessionCard: FC<WorkoutHitSessionCardProps> = ({
    workoutSession,
    onPress,
}) => {
    const style = useThemeStyle(workoutHitSessionCardStyle);
    const navigation =
        useNavigation<
            WorkoutStackNavigationProps<AppRoutes.WORKOUT_SESSION_DETAILS>
        >();
    const dispatch = useAppDispatch();

    const handleNavigationToDetail = () => {
        dispatch(
            workoutSliceActions.setWorkoutProps({
                workoutSessionDetail: workoutSession,
            }),
        );
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.WORKOUT_SESSION_DETAILS,
        });
    };

    const handleOnPress = () => {
        if (onPress) {
            return onPress(workoutSession);
        }
        handleNavigationToDetail();
    };

    const getSessionDate = () => {
        return dateUtils.prettyDateFromUnixTimestamp(workoutSession.createdAt);
    };

    return (
        <MyCard
            key={workoutSession._id.toHexString()}
            title={workoutSession.referenceWorkout.name}
            onPress={handleOnPress}>
            <Divider />
            <MyCard title={'Exercises'}>
                {workoutSession.referenceWorkout.exercises.map(
                    (exercise, index) => {
                        return (
                            <View style={style.item} key={exercise._id}>
                                <View style={style.exerciseRow}>
                                    <View style={style.roundContainer}>
                                        <MyText
                                            type={'captionText'}
                                            style={style.exerciseNumber}>
                                            {`${(index + 1).toString()}`}
                                        </MyText>
                                    </View>
                                    <MyText>{exercise.exercise.name}</MyText>
                                </View>
                            </View>
                        );
                    },
                )}
            </MyCard>
            <View style={style.footer}>
                <MyText type={'captionText'}>{getSessionDate()}</MyText>
            </View>
        </MyCard>
    );
};
