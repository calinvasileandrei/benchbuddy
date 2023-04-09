import React, {FC, useEffect} from 'react';
import {useRealmMuscles} from 'src/hooks/realm/useRealmMuscles.hook';

export interface RealmSubscriptionProviderProps {
    children: React.ReactNode;
}

export const RealmSubscriptionProvider: FC<
    RealmSubscriptionProviderProps
> = props => {
    const realmMuscles = useRealmMuscles();

    useEffect(() => {
        realmMuscles.subscribe();
    }, []);

    return <>{props.children}</>;
};
