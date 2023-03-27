import {RootState} from 'src/store/store';

const getVisible = (state: RootState) => state.myDialog.visible;

const getMyDialogProps = (state: RootState) => state.myDialog.dialogProps;

export const myDialogSelectors = {
    getVisible,
    getMyDialogProps
}
