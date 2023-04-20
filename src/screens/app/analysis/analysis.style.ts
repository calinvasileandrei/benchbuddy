import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const analysisStyle = (theme: Theme) =>
    StyleSheet.create({
        absoluteFill: {
            width: '100%',
            height: '100%',
        },
    });
