import Typesense from 'typesense';
import {
    TYPESENSE_API_HOST,
    TYPESENSE_API_KEY,
    TYPESENSE_API_PORT,
} from '@dotenv';

export const typesenseClient = new Typesense.Client({
    nodes: [
        {
            host: TYPESENSE_API_HOST, // where xxx is the ClusterID of your Typesense Cloud cluster
            port: TYPESENSE_API_PORT,
            protocol: 'http',
        },
    ],
    apiKey: TYPESENSE_API_KEY,
    connectionTimeoutSeconds: 2,
});
