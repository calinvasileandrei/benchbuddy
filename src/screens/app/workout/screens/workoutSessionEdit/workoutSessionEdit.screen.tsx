import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {homeStyle} from 'src/screens/app/home/home.style';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {View} from 'react-native';
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {workoutSessionSelectors} from 'src/store/workoutSession/workoutSession.selectors';
import {workoutSessionSliceActions} from 'src/store/workoutSession/workoutSession.slice';
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {useNavigation} from '@react-navigation/native';
import {ExerciseWithSetCard} from 'src/shared/ExercisesComponents/exerciseWithSetCard/exerciseWithSetCard.component';
import {MyKeyboardAwareScrollView} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component';
import {usePreventBackHook} from 'src/hooks/usePreventBack.hook';
import {workoutSelectors} from 'src/store/workout/workout.selectors';
import {isEqual} from 'lodash';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {dateUtils} from 'src/utils/date.utils';
import {useRealmWorkoutSession} from 'src/hooks/realm/useRealmWorkoutSession.hook';
import {workoutSliceActions} from 'src/store/workout/workout.slice';

export interface WorkoutSessionDetailsScreenProps {}

export const WorkoutSessionEditScreen: FC<
    WorkoutSessionDetailsScreenProps
> = props => {
    const style = useThemeStyle(homeStyle);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const [isLoading, setIsLoading] = React.useState(false);
    const realmWorkoutSession = useRealmWorkoutSession();

    const {notes, workoutSession} = useAppSelector(
        workoutSessionSelectors.getStore,
    );
    const date = useAppSelector(workoutSessionSelectors.getCreatedAt);

    const workoutSessionDetails = useAppSelector(
        workoutSelectors.getWorkoutSessionDetail,
    );
    const templateWorkout = workoutSession?.referenceWorkout;

    const isDirty = () => {
        // check deep equality of sessionExercises
        return (
            !isEqual(workoutSessionDetails, workoutSession) ||
            workoutSession?.notes !== notes
        );
    };

    usePreventBackHook({
        isDirty: isDirty(),
        isActive: !isLoading,
        dependencies: [
            templateWorkout,
            isLoading,
            workoutSession,
            workoutSessionDetails,
            notes,
        ],
        dialogProps: {
            actionFirst: eventAction => ({
                label: 'Discard',
                style: 'destructive',
                onPress: () => {
                    dispatch(workoutSessionSliceActions.clearSession());
                    eventAction();
                },
            }),
        },
    });

    const handleSaveNotes = (notesToSave: string) => {
        dispatch(workoutSessionSliceActions.setNotes(notesToSave));
    };

    const handleSaveExerciseSet = (
        exerciseId: string,
        exerciseSets: ExerciseSetModel[],
    ) => {
        console.log('exerciseId: ', exerciseId);
        console.log('exerciseSets: ', exerciseSets);
        dispatch(
            workoutSessionSliceActions.saveExerciseSet({
                sessionExerciseId: exerciseId,
                exerciseSets,
            }),
        );
    };

    const handleEditSession = async () => {
        setIsLoading(true);
        if (workoutSession) {
            const session: WorkoutSessionModel = {
                ...workoutSession,
                notes: notes || '',
                createdAt: dateUtils.dateToUnixTimestamp(date.toDateString()),
            };
            //update db
            realmWorkoutSession.updateItem(session.id, session);
            //update store detail
            dispatch(
                workoutSliceActions.setWorkoutProps({
                    workoutSessionDetail: workoutSession,
                }),
            );
            await dispatch(workoutSessionSliceActions.clearSession());
            navigation.goBack();
        }
        setIsLoading(false);
    };

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView title={templateWorkout?.name}>
                <View style={{marginTop: 10}}>
                    <MyInput
                        value={notes}
                        numberOfLines={4}
                        multiline={true}
                        onChangeText={handleSaveNotes}
                        placeholder={'Add your notes'}
                    />
                </View>

                {workoutSession &&
                    workoutSession.sessionExercises.map(
                        (exerciseWithSet, index) => {
                            return (
                                <ExerciseWithSetCard
                                    key={exerciseWithSet.id}
                                    exerciseWithSet={exerciseWithSet}
                                    onChange={exercises =>
                                        handleSaveExerciseSet(
                                            exerciseWithSet.id,
                                            exercises,
                                        )
                                    }
                                />
                            );
                        },
                    )}
                <MyButton
                    isLoading={isLoading}
                    disabled={!templateWorkout}
                    withHaptics={'success'}
                    onPress={handleEditSession}>
                    Save session
                </MyButton>
            </MyKeyboardAwareScrollView>
        </MySafeAreaView>
    );
};
