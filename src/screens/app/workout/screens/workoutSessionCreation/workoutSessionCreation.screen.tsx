import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutSessionCreationStyle} from 'src/screens/app/workout/screens/workoutSessionCreation/workoutSessionCreation.style';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component';
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {AppRoutes} from 'src/navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {WorkoutModel} from 'src/models/schema/workout.model';
import {Logger} from 'src/utils/logger';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {workoutSessionSliceActions} from 'src/store/workoutSession/workoutSession.slice';
import {workoutSessionSelectors} from 'src/store/workoutSession/workoutSession.selectors';
import {ExerciseWithSetCard} from 'src/shared/ExercisesComponents/exerciseWithSetCard/exerciseWithSetCard.component';
import {MyKeyboardAwareScrollView} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component';
import {usePreventBackHook} from 'src/hooks/usePreventBack.hook';
import {MyDatePicker} from 'src/shared/baseComponents/myDatePicker/myDatePicker.component';
import {ExerciseModel} from 'src/models/schema/exercise.model';
import {useRealmWorkoutSession} from 'src/hooks/realm/useRealmWorkoutSession.hook';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';

export interface WorkoutSessionCreationScreenProps {}

const logger = new Logger('WorkoutSessionScreen');
export const WorkoutSessionCreationScreen: FC<
    WorkoutSessionCreationScreenProps
> = props => {
    const style = useThemeStyle(workoutSessionCreationStyle);
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const {workoutSession, notes} = useAppSelector(
        workoutSessionSelectors.getStore,
    );
    const date = useAppSelector(workoutSessionSelectors.getCreatedAt);
    const realmWorkoutSession = useRealmWorkoutSession();
    const templateWorkout = workoutSession?.referenceWorkout;
    const [isLoading, setIsLoading] = React.useState(false);

    usePreventBackHook({
        isDirty: !!workoutSession,
        isActive: !isLoading,
        dependencies: [templateWorkout, isLoading],
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

    useEffect(() => {
        if (!templateWorkout) {
            handleSelectWorkoutTemplate();
        }
    }, []);

    const handleSelectWorkoutTemplate = () => {
        const setWorkout = (workout: WorkoutModel) => {
            dispatch(workoutSessionSliceActions.initSession(workout));
            logger.debug('workout selected: ', workout);
        };

        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.WORKOUT_SELECTION_SCREEN,
            params: {setWorkout},
        });
    };

    const handleSaveNotes = (notesToSave: string) => {
        dispatch(workoutSessionSliceActions.setNotes(notesToSave));
    };

    const handleSaveExerciseSet = (
        exerciseWithSetId: string,
        exerciseSets: ExerciseSetModel[],
    ) => {
        console.log('exerciseId: ', exerciseWithSetId);
        console.log('exerciseSets: ', exerciseSets);
        dispatch(
            workoutSessionSliceActions.saveExerciseSet({
                sessionExerciseId: exerciseWithSetId,
                exerciseSets,
            }),
        );
    };

    const handleSaveSession = async () => {
        setIsLoading(true);
        if (workoutSession) {
            const session: WorkoutSessionModel = {
                ...workoutSession,
                notes: notes || '',
            };
            realmWorkoutSession.addItem(session);
            navigation.goBack();
            dispatch(workoutSessionSliceActions.clearSession());
        }
        setIsLoading(false);
    };

    const searchExercise = () => {
        const setExercises = (exercise: ExerciseModel) => {
            dispatch(workoutSessionSliceActions.addExtraExercise(exercise));
        };
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.EXERCISES_SELECTION_SCREEN,
            params: {setExercises},
        });
    };

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView
                title={templateWorkout?.name || 'Workout name'}>
                <MyDatePicker
                    date={date}
                    mode={'datetime'}
                    setDate={newDate =>
                        dispatch(workoutSessionSliceActions.saveDate(newDate))
                    }
                />
                <View style={{marginTop: 10}}>
                    <MyInput
                        value={notes}
                        numberOfLines={4}
                        multiline={true}
                        onChangeText={handleSaveNotes}
                        placeholder={'Add your notes'}
                    />
                </View>

                {templateWorkout?.exercises.map((exerciseWithSet, index) => {
                    return (
                        <ExerciseWithSetCard
                            key={exerciseWithSet.id}
                            templateExerciseSets={exerciseWithSet}
                            withFastSet={true}
                            onChange={exercises =>
                                handleSaveExerciseSet(
                                    exerciseWithSet.id,
                                    exercises,
                                )
                            }
                        />
                    );
                })}
                <MyButton
                    type={'outline'}
                    disabled={!workoutSession}
                    onPress={searchExercise}
                    withHaptics={'impactMedium'}>
                    Add extra exercise
                </MyButton>
                <MyButton
                    isLoading={isLoading}
                    type={'primary'}
                    disabled={!workoutSession}
                    withHaptics={'success'}
                    onPress={handleSaveSession}>
                    Save session
                </MyButton>
            </MyKeyboardAwareScrollView>
        </MySafeAreaView>
    );
};
