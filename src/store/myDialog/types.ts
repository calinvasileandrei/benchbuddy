
export type MyDialogActionStyle = 'default' | 'primary' | 'destructive';

export interface MyDialogShowProps{
    title: string;
    message?: string;
    actionFirst: {
        label: string;
        style?: MyDialogActionStyle;
        onPress: () => void;
    }
    actionSecond: {
        label: string;
        style?: MyDialogActionStyle;
        onPress: () => void;
    }
}
