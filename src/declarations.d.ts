declare module '@dotenv' {
    export const TYPESENSE_API_KEY: string;
    export const TYPESENSE_API_HOST: string;
    export const TYPESENSE_API_PORT: number;
    export const MONGO_APP_ID: string;
}

declare module '*.svg' {
    import React from 'react';
    import {SvgProps} from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}
