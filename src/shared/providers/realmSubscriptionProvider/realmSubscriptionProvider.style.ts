import {StyleSheet} from 'react-native';
import {Theme} from 'src/theme/types';

export const realmSubscriptionProviderStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
        },
        loadingContainer: {
            backgroundColor: 'rgba(0,0,0,0.7)',
        },
    });
