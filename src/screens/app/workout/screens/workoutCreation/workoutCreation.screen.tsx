import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {ExerciseModel} from 'src/models/schema/exercise.model';
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutCreationStyle} from 'src/screens/app/workout/screens/workoutCreation/workoutCreation.style';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {workoutCreationEditSelectors} from 'src/store/workoutCreationEdit/workoutCreationEdit.selectors';
import {workoutCreationEditSliceActions} from 'src/store/workoutCreationEdit/workoutCreationEdit.slice';
import {workoutCreationEditActions} from 'src/store/workoutCreationEdit/workoutCreationEdit.actions';
import {ExerciseWithSetCard} from 'src/shared/ExercisesComponents/exerciseWithSetCard/exerciseWithSetCard.component';
import {
    MyKeyboardAwareScrollView
} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component';
import {usePreventBackHook} from 'src/hooks/usePreventBack.hook';

export interface WorkoutCreationScreenProps {
}

export const WorkoutCreationScreen: FC<WorkoutCreationScreenProps> = (props) => {
    const style = useThemeStyle(workoutCreationStyle)
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>();
    const workout = useAppSelector(workoutCreationEditSelectors.getWorkout)
    const [isLoading, setIsLoading] = React.useState(false)

    usePreventBackHook({
        isDirty: workout && workout.exercises.length > 0 || false,
        isActive: !isLoading,
        dependencies: [workout,isLoading],
        dialogProps: {
            actionFirst: (eventAction) => ({
                label: 'Discard',
                style: 'destructive',
                onPress: () => {
                    eventAction()
                    dispatch(workoutCreationEditSliceActions.deleteWorkout())
                }
            }),
        }
    })


    const searchExercise = () => {
        const setExercises = (exercise: ExerciseModel) => {
            let id = workout?.exercises ? workout.exercises.length.toString() : '0'
            const newExercise = {
                id,
                exercise,
                exerciseSets: [],
                description: ''
            }
            dispatch(workoutCreationEditSliceActions.editWorkout({exercises: [...workout?.exercises || [], newExercise]}))
        }
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.EXERCISES_SELECTION_SCREEN,
            params: {setExercises}
        })
    }


    const handleEdit = (workout: Partial<WorkoutModel>) => {
        dispatch(workoutCreationEditSliceActions.editWorkout(workout))
    }

    const handleSaveWorkout = async () => {
        setIsLoading(true)
        await dispatch(workoutCreationEditActions.saveWorkout())
        navigation.goBack()
        dispatch(workoutCreationEditSliceActions.deleteWorkout())
        setIsLoading(false)
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView>
                <MyCard>
                    <MyInput value={workout?.name} onChangeText={(name) => handleEdit({name})}
                             placeholder={'Name'}/>
                    <MyInput value={workout?.description} onChangeText={(description) => handleEdit({description})}
                             placeholder={'Description'}/>
                    <MyInput value={workout?.notes} onChangeText={(notes) => handleEdit({notes})}
                             placeholder={'Notes'}/>
                </MyCard>
                {
                    workout?.exercises.map((exerciseWorkout) => {
                        return <ExerciseWithSetCard key={exerciseWorkout.id}
                                                    exerciseWithSet={exerciseWorkout}
                                                    onChange={(exercises) => dispatch(workoutCreationEditSliceActions.saveExerciseSet({
                                                        sessionExerciseId: exerciseWorkout.id,
                                                        exerciseSets: exercises
                                                    }))}
                                                    deleteExercise={() => dispatch(workoutCreationEditSliceActions.deleteExercise(exerciseWorkout.id))}
                        />
                    })
                }

                <MyButton type={'outline'} onPress={searchExercise} withHaptics={'impactMedium'}>Add exercise</MyButton>
                <MyButton isLoading={isLoading} type={'primary'} withHaptics={'success'} onPress={() => handleSaveWorkout()}>Save workout to
                    profile</MyButton>
            </MyKeyboardAwareScrollView>
        </MySafeAreaView>
    );
};
