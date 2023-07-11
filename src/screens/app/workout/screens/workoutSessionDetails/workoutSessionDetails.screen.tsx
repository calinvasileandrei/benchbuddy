import React, {FC} from 'react'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {WorkoutSessionCard} from 'src/shared/WorkoutComponents/workoutSessionCard/workoutSessionCard.component'
import {MyScrollView} from 'src/shared/baseComponents/myScrollView/myScrollView.component'
import {useAppSelector} from 'src/store/store'
import {workoutSelectors} from 'src/store/workout/workout.selectors'
import {MyLineChart} from 'src/shared/charts/myLineChart/myLineChart.component'
import {workoutToChartUtils} from 'src/utils/workoutToChart.utils'
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component'
import {MyPieChart} from 'src/shared/charts/myPieChart/myPieChart.component'
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {dateUtils} from 'src/utils/date.utils'
import {workoutSessionDetailsStyle} from 'src/screens/app/workout/screens/workoutSessionDetails/workoutSessionDetails.style'

export interface WorkoutSessionDetailsScreenProps {}

export const WorkoutSessionDetailsScreen: FC<WorkoutSessionDetailsScreenProps> = props => {
    const style = useThemeStyle(workoutSessionDetailsStyle)
    const workoutSession = useAppSelector(workoutSelectors.getWorkoutSessionDetail)

    if (!workoutSession) {
        return null
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyScrollView title={'Your Session'}>
                <MyCard>
                    <MyText type={'bodyText'}>{`${
                        workoutSession.referenceWorkout.hasBeenEdit ? 'Edited ' : ''
                    }Reference workout: ${workoutSession.referenceWorkout.name}`}</MyText>
                </MyCard>
                {workoutSession.notes && (
                    <MyCard title={'Notes:'}>
                        <MyText type={'bodyText'}>{`${workoutSession.notes}`}</MyText>
                    </MyCard>
                )}
                <WorkoutSessionCard workoutSession={workoutSession} />
                <MyCard>
                    <MyText type={'bodyText'}>
                        {dateUtils.getPrettyDateAndTime(
                            dateUtils.dateFromUnixTimestamp(workoutSession.createdAt)
                        )}
                    </MyText>
                </MyCard>
                <MyHeader title={'Analysis'} style={style.analysisTitle} />
                <MyScrollView horizontal={true}>
                    {workoutSession.sessionExercises.map((sessionExercise, index) => {
                        return (
                            <MyLineChart
                                data={workoutToChartUtils.exerciseToLineChart(sessionExercise)}
                                title={sessionExercise.exercise.name}
                                yAxisSuffix={'kg'}
                                width={350}
                                key={index}
                            />
                        )
                    })}
                </MyScrollView>
                <MyScrollView horizontal={true}>
                    {workoutToChartUtils.getPieMuscleOverviewData({workoutSession}).map(item => {
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
