import {useEffect, useRef} from 'react'
import {myDialogSliceActions} from 'src/store/myDialog/myDialog.slice'
import {useNavigation} from '@react-navigation/native'
import {useAppDispatch} from 'src/store/store'
import {Logger} from 'src/utils/logger'
import {MyDialogActionStyle} from 'src/store/myDialog/types'

const logger = new Logger('usePreventBack.hook')

export interface usePreventBackDialogProps {
    title?: string
    message?: string
    actionFirst?: (eventAction: () => void) => {
        label: string
        style?: MyDialogActionStyle
        onPress: () => void
    }
    actionSecond?: (eventAction: () => void) => {
        label: string
        style?: MyDialogActionStyle
        onPress: () => void
    }
}

export interface UsePreventBackHookProps {
    isDirty: boolean
    isActive?: boolean
    dependencies: any[]
    dialogProps?: usePreventBackDialogProps
}

export const usePreventBackHook = (props: UsePreventBackHookProps) => {
    const {isDirty, dependencies, dialogProps, isActive = true} = props
    const dispatch = useAppDispatch()
    const unsubscribeBeforeRemove = useRef<any>(null)
    const navigation = useNavigation()

    const getActionFirst = (eventAction: any) => {
        if (dialogProps?.actionFirst) {
            return dialogProps.actionFirst(() => navigation.dispatch(eventAction))
        }
        return {
            label: 'Discard',
            style: 'destructive' as MyDialogActionStyle,
            onPress: () => navigation.dispatch(eventAction)
        }
    }

    const getActionSecond = (eventAction: any) => {
        if (dialogProps?.actionSecond) {
            return dialogProps.actionSecond(() => navigation.dispatch(eventAction))
        }
        return {
            label: "Don't leave",
            onPress: () => {}
        }
    }

    useEffect(() => {
        unsubscribeBeforeRemove.current = navigation.addListener('beforeRemove', (e: any) => {
            logger.debug('event data nav action: ', e.data.action)
            if (isActive) {
                if ((e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') && isDirty) {
                    e.preventDefault()
                    dispatch(
                        myDialogSliceActions.show({
                            title: dialogProps?.title || 'Discard changes?',
                            message:
                                dialogProps?.message ||
                                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                            actionSecond: getActionSecond(e.data.action),
                            actionFirst: getActionFirst(e.data.action)
                        })
                    )
                }
            }
        })

        return () => {
            if (unsubscribeBeforeRemove.current) {
                unsubscribeBeforeRemove.current()
            }
        }
    }, [navigation, ...dependencies])

    return {}
}
