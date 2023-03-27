import React, {FC} from 'react';
import {View} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {workoutQuickLookStyle} from 'src/screens/app/workout/components/workoutQuickLook/workoutQuickLook.style';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';

export interface WorkoutQuickLookProps {}

export const WorkoutQuickLook: FC<WorkoutQuickLookProps> = () => {
    const style = useThemeStyle(workoutQuickLookStyle);
    const navigation = useNavigation<any>();

    const handleCreateWorkout = () => {
        console.log('handleCreateWorkout');
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.WORKOUT_CREATION_SCREEN,
        });
    };

    return (
        <MyCard>
            <View style={style.iconContainer}>
                <MyText>Add workout</MyText>
                <MyIcon
                    size={30}
                    onPress={handleCreateWorkout}
                    withHaptics={'impactMedium'}
                    iconName="add-circle"
                />
            </View>
        </MyCard>
    );
};
