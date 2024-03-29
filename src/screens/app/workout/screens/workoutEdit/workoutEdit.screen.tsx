import React, {FC, useEffect} from 'react'
import {View} from 'react-native'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {workoutDetailStyle} from 'src/screens/app/workout/screens/workoutDetail/workoutDetail.style'
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component'
import {useNavigation} from '@react-navigation/native'
import {useAppDispatch, useAppSelector} from 'src/store/store'
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component'
import {AppRoutes} from 'src/navigation/routes'
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component'
import {ExerciseModel} from 'src/models/schema/exercise.model'
import {WorkoutModel} from 'src/models/schema/workout.model'
import {workoutSelectors} from 'src/store/workout/workout.selectors'
import {ExerciseWithSetCard} from 'src/shared/ExercisesComponents/exerciseWithSetCard/exerciseWithSetCard.component'
import {workoutCreationEditSelectors} from 'src/store/workoutCreationEdit/workoutCreationEdit.selectors'
import {workoutCreationEditSliceActions} from 'src/store/workoutCreationEdit/workoutCreationEdit.slice'
import {MyKeyboardAwareScrollView} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component'
import {usePreventBackHook} from 'src/hooks/usePreventBack.hook'
import {isEqual} from 'lodash'
import {useRealmWorkouts} from 'src/hooks/realm/useRealmWorkouts.hook'
import {workoutSliceActions} from 'src/store/workout/workout.slice'

export interface WorkoutEditScreenProps {}

export const WorkoutEditScreen: FC<WorkoutEditScreenProps> = props => {
    const style = useThemeStyle(workoutDetailStyle)
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()
    const workoutDetail = useAppSelector(workoutSelectors.getDetailWorkout)
    const workout = useAppSelector(workoutCreationEditSelectors.getWorkout)
    const [isLoading, setIsLoading] = React.useState(false)
    const realmWorkouts = useRealmWorkouts()

    const isDirty = () => {
        // check deep equality of sessionExercises
        return !isEqual(workoutDetail, workout)
    }

    usePreventBackHook({
        isDirty: isDirty(),
        isActive: !isLoading,
        dependencies: [workout, isLoading, workoutDetail, workout],
        dialogProps: {
            actionFirst: eventAction => ({
                label: 'Discard',
                style: 'destructive',
                onPress: () => {
                    eventAction()
                    dispatch(workoutCreationEditSliceActions.deleteWorkout())
                }
            })
        }
    })

    useEffect(() => {
        // preload workout data from detail
        if (workoutDetail) {
            dispatch(workoutCreationEditSliceActions.saveWorkout(workoutDetail))
        }
    }, [])

    const searchExercise = () => {
        const setExercises = (exercise: ExerciseModel) => {
            const _id = workout?.exercises ? workout.exercises.length.toString() : '0'
            const newExercise = {
                _id,
                exercise,
                exerciseSets: [],
                description: ''
            }
            dispatch(
                workoutCreationEditSliceActions.editWorkout({
                    exercises: [...(workout?.exercises || []), newExercise]
                })
            )
        }
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.EXERCISES_SELECTION_SCREEN,
            params: {setExercises}
        })
    }

    const handleEdit = (workoutEdit: Partial<WorkoutModel>) => {
        dispatch(workoutCreationEditSliceActions.editWorkout(workoutEdit))
    }

    const handleEditWorkout = async () => {
        setIsLoading(true)
        if (workout) {
            //update realm
            await realmWorkouts.updateItem(workout._id, workout)
            // update details screen
            await dispatch(
                workoutSliceActions.setWorkoutProps({
                    detailWorkout: workout
                })
            )
            // update list screen
            await dispatch(workoutSliceActions.editWorkout(workout))
            navigation.goBack()
        }
        setIsLoading(false)
    }

    if (!workout) {
        return null
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView>
                <MyCard>
                    <MyInput
                        value={workout?.name || ''}
                        onChangeText={name => handleEdit({name})}
                        placeholder={'Name'}
                    />
                    <MyInput
                        value={workout?.description}
                        onChangeText={description => handleEdit({description})}
                        placeholder={'Description'}
                    />
                    <MyInput
                        value={workout?.notes}
                        onChangeText={notes => handleEdit({notes})}
                        placeholder={'Notes'}
                    />
                </MyCard>
                {workout &&
                    workout.exercises.map(exerciseWorkout => {
                        return (
                            <ExerciseWithSetCard
                                key={exerciseWorkout._id}
                                exerciseWithSet={exerciseWorkout}
                                onChange={exercises =>
                                    dispatch(
                                        workoutCreationEditSliceActions.saveExerciseSet({
                                            sessionExerciseId: exerciseWorkout._id,
                                            exerciseSets: exercises
                                        })
                                    )
                                }
                                deleteExercise={() =>
                                    dispatch(
                                        workoutCreationEditSliceActions.deleteExercise(
                                            exerciseWorkout._id
                                        )
                                    )
                                }
                            />
                        )
                    })}
                <MyButton type={'reverse'} onPress={searchExercise}>
                    Add exercise
                </MyButton>
                <View style={{marginVertical: 10}}>
                    <MyButton
                        isLoading={isLoading}
                        disabled={!isDirty()}
                        type={'outline'}
                        onPress={() => handleEditWorkout()}>
                        Confirm edits
                    </MyButton>
                </View>
            </MyKeyboardAwareScrollView>
        </MySafeAreaView>
    )
}
