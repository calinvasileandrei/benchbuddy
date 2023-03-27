import {Theme} from 'src/theme/types';
import {StyleSheet} from 'react-native';

export const exerciseWithSetCardStyle = (theme: Theme) => StyleSheet.create({
    container: {
        marginVertical: theme.spacing.base,
    },
    footer:{
        flexDirection: "column",
        justifyContent:'center',
        alignItems:'center',
    },
    exerciseSetCreatorContainer: {
        flex: 4,// same number as the number of columns
    }
});
