import {RootState} from 'src/store/store';

const getUser = (state: RootState) => state.user.user;

export const userSelectors = {
    getUser,
};
