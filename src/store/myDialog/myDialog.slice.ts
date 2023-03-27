import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {MyDialogShowProps} from 'src/store/myDialog/types';

export interface MyDialogState {
    visible: boolean;
    dialogProps?: MyDialogShowProps;
}

const initialState: MyDialogState = {
    visible: false,
}

export const myDialogSlice = createSlice({
    name: 'myDialog',
    initialState,
    reducers: {
        show: (state, action: PayloadAction<MyDialogShowProps>) => {
            state.visible = true;
            state.dialogProps = action.payload;
        },
        dismiss: (state, action: PayloadAction<void>) => {
            state.visible = false;
            state.dialogProps = undefined;
        }
    },
    extraReducers: (builder) => {
    }
})

// Action creators are generated for each case reducer function
export const myDialogSliceActions = myDialogSlice.actions
export const myDialogReducer = myDialogSlice.reducer
