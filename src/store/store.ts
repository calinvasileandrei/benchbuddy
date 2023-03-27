import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from 'src/store/user/user.slice';
import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {workoutReducer} from 'src/store/workout/workout.slice';
import {workoutCreationEditReducer} from 'src/store/workoutCreationEdit/workoutCreationEdit.slice';
import {workoutSessionReducer} from 'src/store/workoutSession/workoutSession.slice';
import {workoutSessionInfiniteListReducer} from 'src/store/workoutSessionInfiniteList/workoutSessionInfiniteList.slice';
import {myDialogReducer} from 'src/store/myDialog/myDialog.slice';
import {typesenseInfiniteListReducer} from 'src/store/typesenseInfiniteList/typesenseInfiniteList.slice';
import {myLoadingReducer} from 'src/store/myLoading/myLoading.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
    workoutCreationEdit: workoutCreationEditReducer,
    workoutSession: workoutSessionReducer,
    workoutSessionInfiniteList: workoutSessionInfiniteListReducer,
    myDialog: myDialogReducer,
    typesenseInfiniteList: typesenseInfiniteListReducer,
    myLoading: myLoadingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
