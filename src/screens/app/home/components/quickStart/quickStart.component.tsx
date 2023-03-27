import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {quickStartStyle} from 'src/screens/app/home/components/quickStart/quickStart.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import Animated from 'react-native-reanimated';
import AddIcon from 'assets/add.svg';
import {useNavigation} from '@react-navigation/native';
import {AppRoutes} from 'src/navigation/routes';
import {useQuickStartAnimations} from 'src/screens/app/home/components/quickStart/useQuickStartAnimations';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';

export interface QuickStartProps {}

export const QuickStart: FC<QuickStartProps> = props => {
    const style = useThemeStyle(quickStartStyle);
    const navigation = useNavigation<any>();
    const {
        quickStartContainerStyle,
        myAnimatedContainer,
        iconStyle,
        handleToggleMenu,
    } = useQuickStartAnimations();

    const handleLogWorkoutSession = () => {
        console.log('handleCreateWorkoutSession');
        handleToggleMenu();
        navigation.navigate(AppRoutes.WORKOUTS_STACK, {
            screen: AppRoutes.WORKOUT_SESSION_CREATION_SCREEN,
        });
    };

    const handleStartWorkoutSession = () => {
        console.log('handleStartWorkoutSession');
        handleToggleMenu();
    };

    return (
        <MyCard>
            {/*            <View style={style.iconContainer}>
                <View style={style.quickStartTextContainer}>
                    <MyText>Start a workout session</MyText>
                </View>
                <Animated.View style={[style.animatedButton, myAnimatedContainer]}>
                    <Animated.View style={[iconStyle]}>
                        <TouchableOpacity onPress={handleToggleMenu}>
                            <AddIcon/>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[style.quickStart, quickStartContainerStyle]}>
                        <TouchableOpacity style={style.quickStartFirstElement} onPress={handleStartWorkoutSession}>
                                <MyText>Start a session</MyText>
                                <MyIcon iconName={'flame-outline'} color={style.icons.color}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.quickStartSecondElement} onPress={handleLogWorkoutSession}>
                                <MyText>Log a session</MyText>
                                <MyIcon iconName={'stopwatch-outline'} color={style.icons.color}/>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </View>*/}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 8,
                }}>
                <MyText>Add workout session</MyText>
                <MyIcon
                    size={30}
                    onPress={handleLogWorkoutSession}
                    iconName="add-circle"
                    withHaptics={'impactMedium'}
                />
            </View>
        </MyCard>
    );
};
