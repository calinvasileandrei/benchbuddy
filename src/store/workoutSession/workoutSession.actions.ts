import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserWorkoutService} from 'src/services/app/userWorkout.service';
import {RootState} from 'src/store/store';
import {WorkoutSessionModel} from 'src/models/schema/workoutSession.model';
import {UserService} from 'src/services/app/user.service';
import {workoutSessionsService} from 'src/services/app/workoutSessions.service';
import {workoutSessionTypesenseService} from 'src/services/appAdmin/typesense/workoutSession.typesense.servise';
import {workoutSessionInfiniteListActions} from 'src/store/workoutSessionInfiniteList/workoutSessionInfiniteList.actions';
import {workoutSliceActions} from 'src/store/workout/workout.slice';

const workoutSessionActionNames = createActionTypesMap('workoutCreation', [
    'saveSession',
    'editSession',
]);

export const saveSession = createAsyncThunk(
    workoutSessionActionNames.saveSession,
    async (args, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const user = UserService.getAuthUser();
            if (state.workoutSession.workoutSession && user) {
                const session: WorkoutSessionModel = {
                    ...state.workoutSession.workoutSession,
                    notes: state.workoutSession.notes || '',
                    userId: user.uid,
                };
                console.log('workout session Exercises', session);
                // Save session in workoutSession collection
                await workoutSessionsService.saveWorkoutSession(session);
                // Save session id inside the user
                await UserWorkoutService.saveUserWorkoutSession(session.id);
                // Save the session Hit in Typesense
                await workoutSessionTypesenseService.addWorkoutSession(session);
                // Refresh the list
                await thunkAPI.dispatch(
                    workoutSessionInfiniteListActions.refreshData(),
                );
                return;
            }
            throw new Error('workoutSession not found');
        } catch (e: any) {
            throw new Error(`saveSession error', ${(e as any).message}`);
        }
    },
);

export const editSession = createAsyncThunk(
    workoutSessionActionNames.editSession,
    async (args, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const user = UserService.getAuthUser();
            if (state.workoutSession.workoutSession && user) {
                const session: WorkoutSessionModel = {
                    ...state.workoutSession.workoutSession,
                    notes: state.workoutSession.notes || '',
                    userId: user.uid,
                };
                console.log('workout session Exercises', session);
                // Save session in workoutSession collection
                await workoutSessionsService.saveWorkoutSession(session);
                // Save session id inside the user
                await UserWorkoutService.saveUserWorkoutSession(session.id);
                // Save the session Hit in Typesense
                await workoutSessionTypesenseService.updateWorkoutSession(
                    session,
                );
                // Refresh the list
                await thunkAPI.dispatch(
                    workoutSessionInfiniteListActions.refreshData(),
                );
                // Update the session detail
                thunkAPI.dispatch(
                    workoutSliceActions.setWorkoutProps({
                        workoutSessionDetail: session,
                    }),
                );
                return;
            }
            throw new Error('workoutSession not found');
        } catch (e: any) {
            throw new Error(`edit error', ${(e as any).message}`);
        }
    },
);

export const workoutSessionActions = {
    saveSession,
    editSession,
};
