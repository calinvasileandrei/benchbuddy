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

export interface RealmSubscriptionProviderProps {
    children: React.ReactNode;
}

const logger = new Logger('RealmSubscriptionProvider');
export const RealmSubscriptionProvider: FC<
    RealmSubscriptionProviderProps
> = props => {
    const realm = useRealm();
    const realmMuscles = useRealmMuscles();
    const realmExercises = useRealmExercises();
    const realmWorkouts = useRealmWorkouts();
    const realmWorkoutSessions = useRealmWorkoutSession();
    const dispatch = useAppDispatch();
    const [isSyncing, setIsSyncing] = React.useState(false);

    useEffect(() => {
        setIsSyncing(true);
        realmMuscles.subscribe();
        realmExercises.subscribe();
        realmWorkouts.subscribe();
        realmWorkoutSessions.subscribe();
        (async () => {
            await realm.subscriptions.waitForSynchronization();
            setIsSyncing(false);
        })();
    }, []);

    return (
        <>
            {isSyncing && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10000,
                    }}>
                    <MyLoading
                        caption={'Syncing data'}
                        style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
                    />
                </View>
            )}
            {props.children}
        </>
    );
};
