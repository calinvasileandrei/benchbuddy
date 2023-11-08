import React, {FC} from 'react'
import {Dialog} from '@rneui/themed'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {useAppDispatch, useAppSelector} from 'src/store/store'
import {myDialogSelectors} from 'src/store/myDialog/myDialog.selectors'
import {myDialogSliceActions} from 'src/store/myDialog/myDialog.slice'
import {myDialogStyle} from 'src/shared/providers/myDialogProvider/myDialog.style'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {MyDialogActionStyle} from 'src/store/myDialog/types'

export interface MyDialogProviderProps {
    children: React.ReactNode
}

export const MyDialogProvider: FC<MyDialogProviderProps> = props => {
    const dispatch = useAppDispatch()
    const style = useThemeStyle(myDialogStyle)
    const visible = useAppSelector(myDialogSelectors.getVisible)
    const dialogProps = useAppSelector(myDialogSelectors.getMyDialogProps)

    const handleDismiss = () => {
        dispatch(myDialogSliceActions.dismiss())
    }
    const handleConfirm = () => {
        dialogProps?.actionFirst.onPress()
        handleDismiss()
    }

    const handleCancel = () => {
        dialogProps?.actionSecond.onPress()
        handleDismiss()
    }

    const getTitleColor = (actionStyle?: MyDialogActionStyle) => {
        switch (actionStyle) {
            case 'destructive':
                return style.destructiveTitle
            case 'primary':
                return style.primaryTitle
            default:
                return style.defaultTitle
        }
    }

    return (
        <>
            <Dialog
                isVisible={visible}
                overlayStyle={style.overlay}
                onBackdropPress={handleDismiss}>
                <Dialog.Title titleStyle={style.title} title={dialogProps?.title} />
                {dialogProps?.message && <MyText>{dialogProps?.message}</MyText>}
                <Dialog.Actions>
                    <Dialog.Button
                        titleStyle={getTitleColor(dialogProps?.actionFirst.style)}
                        title={dialogProps?.actionFirst.label}
                        onPress={handleConfirm}
                    />
                    <Dialog.Button
                        titleStyle={getTitleColor(dialogProps?.actionSecond.style)}
                        title={dialogProps?.actionSecond.label}
                        onPress={handleCancel}
                    />
                </Dialog.Actions>
            </Dialog>
            {props.children}
        </>
    )
}
