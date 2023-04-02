import React, {FC, useEffect} from 'react';
import {useRealm} from 'src/services/realm.config';
import {RealmCollections} from 'src/models/schema/realmTypes';
import {Logger} from 'src/utils/logger';

export interface RealmLoggerProps {
    children: React.ReactNode;
}

const logger = new Logger('RealmLogger');

export const RealmLogger: FC<RealmLoggerProps> = ({children}) => {
    const realmInstance = useRealm();

    useEffect(() => {
        const fetchData = async () => {
            const yourCollection = realmInstance.objects(
                RealmCollections.WORKOUT,
            );

            // Add a change listener to the collection
            yourCollection.addListener((collection, changes) => {
                // Log the changes
                const changeLogs = changes.insertions.map(index => {
                    const insertedObject = collection[index];
                    return `Inserted: ${JSON.stringify(insertedObject)}`;
                });

                logger.debug('Changes:', changeLogs);
            });

            // Log the initial data
            logger.debug(
                `Initial data: ${JSON.stringify([...yourCollection])}`,
            );
        };

        fetchData();

        // Clean up the listener when the component is unmounted
        return () => {
            if (realmInstance) {
                realmInstance.removeAllListeners();
                realmInstance.close();
            }
        };
    }, []);

    return <>{children}</>;
};
