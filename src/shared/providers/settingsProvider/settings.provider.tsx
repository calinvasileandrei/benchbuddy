import {FC, useEffect} from 'react'
import {useRealmUser} from '../../../hooks/realm/useRealmUser.hook'
import {useAppDispatch} from '../../../store/store'
import {settingsActions} from '../../../store/settings/settings.slice'
import {UnitModel} from '../../../models/unit.model'

export interface SettingsProviderProps {
    children: React.ReactNode
}

export const SettingsProvider: FC<SettingsProviderProps> = props => {
    const {user} = useRealmUser()
    const dispatch = useAppDispatch()

    useEffect(() => {
        //set settings from data storage to store
        console.log('SettingsProvider setting user unit: ', user?.unit)
        dispatch(settingsActions.set({unit: (user?.unit as UnitModel) || 'Metric'}))
    }, [user])

    return <>{props.children}</>
}
