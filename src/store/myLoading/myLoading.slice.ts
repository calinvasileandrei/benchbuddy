import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from 'src/store/store';

export interface MyLoadingState {
  isLoading: boolean;
}

const initialState: MyLoadingState = {
  isLoading: false,
};

export const myLoadingSlice = createSlice({
  name: 'myLoading',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const myLoadingProviderStatus = (state: RootState) =>
  state.myLoading.isLoading;

// Action creators are generated for each case reducer function
export const myLoadingActions = myLoadingSlice.actions;
export const myLoadingReducer = myLoadingSlice.reducer;
