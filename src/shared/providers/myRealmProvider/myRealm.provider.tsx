import React, {FC} from 'react'
import {AppProvider, UserProvider} from '@realm/react'
import {MONGO_APP_ID} from '@dotenv'
import {RealmProvider} from 'src/services/realm.config'
import {RealmLogger} from 'src/shared/advancedComponents/realmLogger/realmLogger.component'
import {RealmSubscriptionProvider} from 'src/shared/providers/realmSubscriptionProvider/realmSubscription.provider'
import {View} from 'react-native'
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component'
import {AuthenticationStack} from 'src/navigation/stacks/authentication/authentication.stack'

export interface MyRealmProviderProps {
    children: React.ReactNode
}

export const MyRealmProvider: FC<MyRealmProviderProps> = ({children}) => {
    const renderFallbackLoading = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10000
                }}>
                <MyLoading />
            </View>
        )
    }

    return (
        <AppProvider id={MONGO_APP_ID}>
            <UserProvider fallback={AuthenticationStack}>
                <RealmProvider
                    fallback={renderFallbackLoading}
                    sync={{
                        flexible: true,
                        onError: console.log
                    }}>
                    <RealmLogger>
                        <RealmSubscriptionProvider>{children}</RealmSubscriptionProvider>
                    </RealmLogger>
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    )
}
