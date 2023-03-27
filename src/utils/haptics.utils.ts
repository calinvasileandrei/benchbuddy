import HapticFeedback from 'react-native-haptic-feedback';

export type HapticType =
    | boolean
    | 'success'
    | 'warning'
    | 'error'
    | 'selection'
    | 'impactLight'
    | 'impactMedium'
    | 'impactHeavy';

export const handleHaptic = (type?: HapticType) => {
    if (type) {
        switch (type) {
            case 'success':
                HapticFeedback.trigger('notificationSuccess');
                break;
            case 'warning':
                HapticFeedback.trigger('notificationWarning');
                break;
            case 'error':
                HapticFeedback.trigger('notificationError');
                break;
            case 'selection':
                HapticFeedback.trigger('selection');
                break;
            case 'impactLight':
                HapticFeedback.trigger('impactLight');
                break;
            case 'impactMedium':
                HapticFeedback.trigger('impactMedium');
                break;
            case 'impactHeavy':
                HapticFeedback.trigger('impactHeavy');
                break;
            default:
                break;
        }
    }
};
