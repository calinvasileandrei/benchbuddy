import React, {FC, useEffect} from 'react';
import {useRealmMuscles} from 'src/hooks/realm/useRealmMuscles.hook';
import {useRealmExercises} from 'src/hooks/realm/useRealmExercises.hook';
import {useRealmWorkouts} from 'src/hooks/realm/useRealmWorkouts.hook';
import {useAppDispatch} from 'src/store/store';
import {useRealm} from 'src/services/realm.config';
import {Logger} from 'src/utils/logger';
import {View} from 'react-native';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';
import {useRealmWorkoutSession} from 'src/hooks/realm/useRealmWorkoutSession.hook';
import {useRealmUser} from 'src/hooks/realm/useRealmUser.hook';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {realmSubscriptionProviderStyles} from 'src/shared/providers/realmSubscriptionProvider/realmSubscriptionProvider.style';

export interface RealmSubscriptionProviderProps {
    children: React.ReactNode;
}

const logger = new Logger('RealmSubscriptionProvider');
export const RealmSubscriptionProvider: FC<
    RealmSubscriptionProviderProps
> = props => {
    const style = useThemeStyle(realmSubscriptionProviderStyles);
    const realm = useRealm();
    // Realms
    const realmMuscles = useRealmMuscles();
    const realmExercises = useRealmExercises();
    const realmWorkouts = useRealmWorkouts();
    const realmWorkoutSessions = useRealmWorkoutSession();
    const realmUser = useRealmUser();

    const dispatch = useAppDispatch();
    const [isSyncing, setIsSyncing] = React.useState(false);

    useEffect(() => {
        setIsSyncing(true);
        realmMuscles.subscribe();
        realmExercises.subscribe();
        realmWorkouts.subscribe();
        realmWorkoutSessions.subscribe();
        realmUser.subscribe();
        (async () => {
            await realm.subscriptions.waitForSynchronization();
            setIsSyncing(false);
        })();
    }, []);

    return (
        <>
            {isSyncing && (
                <View style={style.container}>
                    <MyLoading
                        caption={'Syncing data'}
                        style={style.loadingContainer}
                    />
                </View>
            )}
            {props.children}
        </>
    );
};
