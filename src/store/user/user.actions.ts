import {createActionTypesMap} from 'src/utils/redux.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserService} from 'src/services/app/user.service';
import {UserAuthModel, UserModel} from 'src/models/user.model';

const userActionNames = createActionTypesMap('user', ['getUser']);

export const getUser = createAsyncThunk<
    UserModel | undefined,
    UserAuthModel | undefined
>(userActionNames.getUser, async (fireUser, thunkAPI) => {
    try {
        return UserService.getUser(fireUser);
    } catch (e: any) {
        throw new Error(`getUser error', ${(e as any).message}`);
    }
});

export const userActions = {
    getUser,
};
