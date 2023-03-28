import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from 'src/models/user.model';
import {userActions} from 'src/store/user/user.actions';

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
    extraReducers: builder => {
        builder.addCase(userActions.getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isError = false;
            state.isLoading = false;
        });
        builder.addCase(userActions.getUser.rejected, (state, action) => {
            state.user = undefined;
            state.isError = true;
            state.isLoading = false;
        });
        builder.addCase(userActions.getUser.pending, (state, action) => {
            state.user = undefined;
            state.isError = false;
            state.isLoading = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const userSliceActions = userSlice.actions;

export const userReducer = userSlice.reducer;
