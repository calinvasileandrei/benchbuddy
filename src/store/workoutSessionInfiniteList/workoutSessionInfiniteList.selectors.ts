import {RootState} from 'src/store/store';

const getWorkoutSessions = (state: RootState) => state.workoutSessionInfiniteList.workoutSessions;

const getIsLoading = (state: RootState) => state.workoutSessionInfiniteList.isLoading;
const getPage = (state: RootState) => state.workoutSessionInfiniteList.page;

export const workoutSessionInfiniteListSelectors = {
    getWorkoutSessions,
    getIsLoading,
    getPage
}
