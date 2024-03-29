import React, {FC, useEffect} from 'react'
import {View} from 'react-native'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {workoutDetailStyle} from 'src/screens/app/workout/screens/workoutDetail/workoutDetail.style'
import {useAppSelector} from 'src/store/store'
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {Divider} from '@rneui/themed'
import {MyScrollView} from 'src/shared/baseComponents/myScrollView/myScrollView.component'
import {workoutSelectors} from 'src/store/workout/workout.selectors'
import {ExerciseSetRowViewer} from 'src/shared/ExercisesComponents/exerciseSetRowViewer/exerciseSetRowViewer.component'
import {workoutToChartUtils} from 'src/utils/workoutToChart.utils'
import {MyPieChart} from 'src/shared/charts/myPieChart/myPieChart.component'

export interface WorkoutDetailScreenProps {}

export const WorkoutDetailScreen: FC<WorkoutDetailScreenProps> = props => {
    const style = useThemeStyle(workoutDetailStyle)
    const workout = useAppSelector(workoutSelectors.getDetailWorkout)

    useEffect(() => {
        console.log('WorkoutDetail', workout)
    }, [workout])

    if (!workout) {
        return null
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyScrollView title={workout.name}>
                <MyCard key={workout._id.toHexString()} title={'Exercises'}>
                    {workout.notes && <MyText>{workout.notes}</MyText>}
                    <Divider />
                    <View style={style.exerciseContainer}>
                        {workout.exercises.map((exercise, index) => {
                            return (
                                <View style={style.item} key={exercise._id}>
                                    <MyText style={style.exerciseName}>
                                        {exercise.exercise?.name}
                                    </MyText>
                                    {exercise.exerciseSets.map((set, i) => (
                                        <ExerciseSetRowViewer
                                            key={set.setNumber}
                                            exerciseSet={set}
                                            setNumber={i}
                                        />
                                    ))}
                                </View>
                            )
                        })}
                    </View>
                </MyCard>
                {workout.description && (
                    <MyCard title={'Description'}>
                        <MyText>{workout.description}</MyText>
                    </MyCard>
                )}
                <MyCard>
                    <MyText type={'bodyText'}>{`Created at ${workout.createdAt}`}</MyText>
                </MyCard>
                <MyScrollView horizontal={true}>
                    {workoutToChartUtils
                        .getPieMuscleOverviewData({workoutModel: workout})
                        .map(item => {
                            return (
                                <MyPieChart
                                    key={item.name}
                                    width={350}
                                    title={item.name}
                                    data={item.data}
                                    accessor={'count'}
                                />
                            )
                        })}
                </MyScrollView>
            </MyScrollView>
        </MySafeAreaView>
    )
}
