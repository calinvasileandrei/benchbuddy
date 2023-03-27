import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {homeStyle} from 'src/screens/app/home/home.style';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {View} from 'react-native';
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {workoutSessionSelectors} from 'src/store/workoutSession/workoutSession.selectors';
import {workoutSessionActions} from 'src/store/workoutSession/workoutSession.actions';
import {workoutSessionSliceActions} from 'src/store/workoutSession/workoutSession.slice';
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {useNavigation} from '@react-navigation/native';
import {ExerciseWithSetCard} from 'src/shared/ExercisesComponents/exerciseWithSetCard/exerciseWithSetCard.component';
import {
    MyKeyboardAwareScrollView
} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component';
import {usePreventBackHook} from 'src/hooks/usePreventBack.hook';
import {workoutSelectors} from 'src/store/workout/workout.selectors';
import {isEqual} from 'lodash';

export interface WorkoutSessionDetailsScreenProps {
}

export const WorkoutSessionEditScreen: FC<WorkoutSessionDetailsScreenProps> = (props) => {
    const style = useThemeStyle(homeStyle)
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()
    const [isLoading, setIsLoading] = React.useState(false)

    const {notes, workoutSession} = useAppSelector(workoutSessionSelectors.getStore)
    const workoutSessionDetails = useAppSelector(workoutSelectors.getWorkoutSessionDetail)
    const templateWorkout = workoutSession?.referenceWorkout

    const isDirty = () => {
        // check deep equality of sessionExercises
        return !isEqual(workoutSessionDetails, workoutSession) || workoutSession?.notes !== notes
    }

    usePreventBackHook({
        isDirty: isDirty(),
        isActive: !isLoading,
        dependencies: [templateWorkout, isLoading, workoutSession, workoutSessionDetails, notes],
        dialogProps: {
            actionFirst: (eventAction) => ({
                label: 'Discard',
                style: 'destructive',
                onPress: () => {
                    dispatch(workoutSessionSliceActions.clearSession())
                    eventAction()
                }
            }),
        }
    })

    const handleSaveNotes = (notes: string) => {
        dispatch(workoutSessionSliceActions.setNotes(notes))
    }

    const handleSaveExerciseSet = (exerciseId: string, exerciseSets: ExerciseSetModel[]) => {
        console.log('exerciseId: ', exerciseId)
        console.log('exerciseSets: ', exerciseSets)
        dispatch(workoutSessionSliceActions.saveExerciseSet({sessionExerciseId: exerciseId, exerciseSets}))
    }

    const handleEditSession = async () => {
        setIsLoading(true)
        await dispatch(workoutSessionActions.editSession())
        navigation.goBack()
        dispatch(workoutSessionSliceActions.clearSession())
        setIsLoading(false)
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView title={templateWorkout?.name}>
                <View style={{marginTop: 10}}>
                    <MyInput value={notes}
                             numberOfLines={4}
                             multiline={true}
                             onChangeText={handleSaveNotes}
                             placeholder={'Add your notes'}/>
                </View>

                {
                    workoutSession && workoutSession.sessionExercises.map((exerciseWithSet, index) => {
                        return <ExerciseWithSetCard key={exerciseWithSet.id}
                                                    exerciseWithSet={exerciseWithSet}
                                                    onChange={(exercises) => handleSaveExerciseSet(exerciseWithSet.id, exercises)}
                        />
                    })
                }
                <MyButton isLoading={isLoading} disabled={!templateWorkout} withHaptics={'success'}
                          onPress={handleEditSession}>Save
                    session</MyButton>

            </MyKeyboardAwareScrollView>
        </MySafeAreaView>

    );
};
