import React from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {Logger} from 'src/utils/logger';
import PagerView, {
    PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';
import {FirstSlideScreen} from 'src/screens/auth/loginIntro/screens/firstSlide.screen';
import {SecondSlideScreen} from 'src/screens/auth/loginIntro/screens/secondSlide.screen';
import {ThirdSlideScreen} from 'src/screens/auth/loginIntro/screens/thirdSlide.screen';
import {useNavigation} from '@react-navigation/native';
import {AuthenticationRoutes} from 'src/navigation/routes';
import {loginIntroStyle} from 'src/screens/auth/loginIntro/loginIntro.style';

const logger = new Logger('LoginScreen');

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const LoginIntroScreen = () => {
    const style = useThemeStyle(loginIntroStyle);
    const navigation = useNavigation<any>();

    //Animations
    const width = Dimensions.get('window').width;
    const ref = React.useRef<PagerView>(null);
    const scrollOffsetAnimatedValue = React.useRef(
        new Animated.Value(0),
    ).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const slideNumber = 3;
    const inputRange = [0, slideNumber];
    const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

    const scrollX = Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue,
    ).interpolate({
        inputRange,
        outputRange: [0, slideNumber * width],
    });

    const onPageScroll = React.useMemo(
        () =>
            Animated.event<PagerViewOnPageScrollEventData>(
                [
                    {
                        nativeEvent: {
                            offset: scrollOffsetAnimatedValue,
                            position: positionAnimatedValue,
                        },
                    },
                ],
                {
                    useNativeDriver: false,
                },
            ),
        [],
    );

    const handleNextPage = () => {
        if (ref.current) {
            if (currentPageIndex === slideNumber - 1) {
                return navigation.navigate(AuthenticationRoutes.LOGIN_SCREEN);
            }
            ref.current.setPage(currentPageIndex + 1);
        }
    };

    return (
        <MySafeAreaView edges={['bottom', 'top']}>
            <AnimatedPagerView
                initialPage={0}
                ref={ref}
                onPageSelected={e => {
                    setCurrentPageIndex(e.nativeEvent.position);
                }}
                style={style.pagerView}
                onPageScroll={onPageScroll}>
                <FirstSlideScreen />
                <SecondSlideScreen />
                <ThirdSlideScreen />
            </AnimatedPagerView>
            <View style={style.dotContainer}>
                <View style={style.dotRow}>
                    <View style={style.dots}>
                        <ScalingDot data={[1, 2, 3]} scrollX={scrollX as any} />
                    </View>
                    <MyButton type={'round'} onPress={handleNextPage}>
                        <MyIcon
                            iconName={'chevron-forward-outline'}
                            size={34}
                            color={'white'}
                        />
                    </MyButton>
                </View>
            </View>
        </MySafeAreaView>
    );
};
