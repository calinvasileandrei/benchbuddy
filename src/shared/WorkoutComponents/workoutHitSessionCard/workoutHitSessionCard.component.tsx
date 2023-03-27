import React, {FC} from 'react';
import {View} from 'react-native'
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {Divider} from '@rneui/themed';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {
    workoutHitSessionCardStyle
} from 'src/shared/WorkoutComponents/workoutHitSessionCard/workoutHitSessionCard.style';
import {WorkoutStackNavigationProps} from 'src/navigation/stacks/workout/types';
import {WorkoutSessionHitModel} from 'src/models/typesense/workoutSession.schema';
import {dateUtils} from 'src/utils/date.utils';

export interface WorkoutHitSessionCardProps {
    workoutSession: WorkoutSessionHitModel;
    onPress?: (workoutSession: WorkoutSessionHitModel) => void
}

export const WorkoutHitSessionCard: FC<WorkoutHitSessionCardProps> = ({workoutSession, onPress}) => {
    const style = useThemeStyle(workoutHitSessionCardStyle)
    const navigation = useNavigation<WorkoutStackNavigationProps<AppRoutes.WORKOUT_SESSION_DETAILS>>()

    const handleNavigationToDetail = () => {
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.WORKOUT_SESSION_DETAILS,
            params: {
                workoutSessionId: workoutSession.id
            }
        })
    }

    const handleOnPress = () => {
        if (onPress) {
            return onPress(workoutSession)
        }
        handleNavigationToDetail()
    }


    const getSessionDate = () => {
        const date = dateUtils.dateFromUnixTimestamp(workoutSession.createdAt)
        return dateUtils.getPrettyDateAndTime(date)
    }

    return (
        <MyCard key={workoutSession.id} title={getSessionDate()}
                onPress={handleOnPress}>
            <MyText>{workoutSession.notes}</MyText>
            <Divider/>
            <MyCard title={'Exercises'}>
                {
                    workoutSession.exercises.map((exercise, index) => {
                        return (
                            <View style={style.item} key={exercise}>
                                <View style={style.exerciseRow}>
                                    <View style={style.roundContainer}>
                                        <MyText type={'captionText'} style={style.exerciseNumber}>
                                            {`${(index + 1).toString()}`}
                                        </MyText>
                                    </View>
                                    <MyText>{exercise}</MyText>
                                </View>
                            </View>
                        )
                    })}
            </MyCard>
        </MyCard>
    );
};
