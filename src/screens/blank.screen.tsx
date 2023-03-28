import React, {FC} from 'react';
import {View} from 'react-native';

export interface BlankScreenProps {}

export const BlankScreen: FC<BlankScreenProps> = props => {
    return <View />;
};
