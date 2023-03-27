import React from 'react';
import {useAppDispatch, useAppSelector} from 'src/store/store';
import {userSelectors} from 'src/store/user/user.selectors';
import {userSliceActions} from 'src/store/user/user.slice';
import {userActions} from 'src/store/user/user.actions';
import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.getUser);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch(userActions.getUser(user));
      } else {
        // User is signed out
        dispatch(userSliceActions.deleteUser());
      }
    });
  }, []);

  return {
    user,
  };
};
