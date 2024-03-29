import React, {FC} from 'react'
import {View} from 'react-native'
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {workoutSessionCardStyle} from 'src/shared/WorkoutComponents/workoutSessionCard/workoutSessionCard.style'
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model'
import {ExerciseSetRowViewer} from 'src/shared/ExercisesComponents/exerciseSetRowViewer/exerciseSetRowViewer.component'

export interface WorkoutSessionCardProps {
    workoutSession: WorkoutSessionModel
    onPress?: (workoutSession: WorkoutSessionModel) => void
}

export const WorkoutSessionCard: FC<WorkoutSessionCardProps> = ({workoutSession, onPress}) => {
    const style = useThemeStyle(workoutSessionCardStyle)

    return (
        <MyCard key={workoutSession._id.toHexString()} title={'Exercises'}>
            {workoutSession.sessionExercises.map((exercise, index) => {
                return (
                    <View style={style.item} key={exercise._id}>
                        <MyText style={style.exerciseName}>{exercise.exercise.name}</MyText>
                        {exercise.exerciseSets.map((set, i) => (
                            <ExerciseSetRowViewer key={i} exerciseSet={set} setNumber={i} />
                        ))}
                    </View>
                )
            })}
        </MyCard>
    )
}
