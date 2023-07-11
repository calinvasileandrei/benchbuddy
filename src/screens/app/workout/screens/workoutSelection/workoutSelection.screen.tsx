import React, {FC} from 'react'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {WorkoutModel} from 'src/models/schema/workout.model'
import {Logger} from 'src/utils/logger'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {workoutStyle} from 'src/screens/app/workout/workout.style'
import {useNavigation, useRoute} from '@react-navigation/native'
import {WorkoutRouteProp} from 'src/navigation/stacks/workout/types'
import {AppRoutes} from 'src/navigation/routes'
import {handleHaptic} from 'src/utils/haptics.utils'
import {WorkoutInfiniteFlatList} from 'src/shared/WorkoutComponents/workoutInfiniteFlatList/workoutInfiniteFlatList.component'

export interface WorkoutSelectionScreenProps {}

const logger = new Logger('WorkoutScreen')
export const WorkoutSelectionScreen: FC<WorkoutSelectionScreenProps> = props => {
    const style = useThemeStyle(workoutStyle)

    const navigation = useNavigation<any>()
    const route = useRoute<WorkoutRouteProp<AppRoutes.WORKOUT_SELECTION_SCREEN>>()

    const handleSelectWorkout = (workout: WorkoutModel) => {
        route.params.setWorkout(workout)
        handleHaptic('success')
        navigation.goBack()
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <WorkoutInfiniteFlatList onItemPress={handleSelectWorkout} />
        </MySafeAreaView>
    )
}
