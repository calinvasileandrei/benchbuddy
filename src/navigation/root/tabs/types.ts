import {AppRoutes} from 'src/navigation/routes'
import type {CompositeScreenProps} from '@react-navigation/native'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {RootStackParamList, RootStackScreenProps} from 'src/navigation/root/types'

export type TabParamList = {
    [AppRoutes.HOME_SCREEN]: undefined
    [AppRoutes.WORKOUTS_SCREEN]: undefined
    [AppRoutes.EXERCISES_SCREEN]: undefined
    [AppRoutes.ACCOUNT_SCREEN]: undefined
}

export type TabsScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>
