import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {UserModel} from 'src/models/user.model';

export interface UserState {
    user?: UserModel;
    isLoading: boolean;
    isError: boolean;
}

const initialState: UserState = {
    isError: false,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
        },
        deleteUser: (state, action: PayloadAction<void>) => {
            state.user = undefined;
        },
    },
    extraReducers: builder => {},
});

// Action creators are generated for each case reducer function
export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;
