import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';

const exerciseActionNames = createActionTypesMap('exercise', [
    'getExercises',
]);


export const getExercises = createAsyncThunk(exerciseActionNames.getExercises, async (args, thunkAPI) => {
    try {
        return []
    } catch (e: any) {
        throw new Error('getWorkouts error', e.message)
    }
});


export const exerciseActions = {
    getExercises
}
