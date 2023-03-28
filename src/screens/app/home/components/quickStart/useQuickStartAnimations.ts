import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

export const useQuickStartAnimations = () => {
    const defaultValues = {
        buttonWidth: 22,
        buttonHeight: 22,
        buttonRadius: 44,
        isMenuOpen: 0,
    };

    const openValues = {
        buttonWidth: 330,
        buttonHeight: 75,
        buttonRadius: 8,
        isMenuOpen: 1,
    };

    //Animations
    const buttonWidth = useSharedValue<number | string>(
        defaultValues.buttonWidth,
    );
    const buttonHeight = useSharedValue<number>(defaultValues.buttonHeight);
    const buttonRadius = useSharedValue<number>(defaultValues.buttonRadius);
    const isMenuOpen = useSharedValue<number>(defaultValues.isMenuOpen);

    const myAnimatedContainer = useAnimatedStyle(() => {
        const getRadius = () => {
            if (isMenuOpen.value) {
                return withTiming(buttonRadius.value, {
                    duration: 200,
                    easing: Easing.in(Easing.ease),
                });
            }
            return withTiming(buttonRadius.value, {
                duration: 200,
                easing: Easing.in(Easing.ease),
            });
        };

        const getHeight = () => {
            if (isMenuOpen.value) {
                return withDelay(
                    200,
                    withTiming(buttonHeight.value, {
                        duration: 200,
                        easing: Easing.inOut(Easing.ease),
                    }),
                );
            }
            return withTiming(buttonHeight.value, {
                duration: 200,
                easing: Easing.inOut(Easing.ease),
            });
        };

        const getWidth = () => {
            if (isMenuOpen.value) {
                return withTiming(buttonWidth.value, {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                });
            }
            return withDelay(
                200,
                withTiming(buttonWidth.value, {
                    duration: 200,
                    easing: Easing.inOut(Easing.ease),
                }),
            );
        };

        return {
            height: getHeight(),
            width: getWidth(),
            borderRadius: getRadius(),
        };
    }, []);

    const quickStartContainerStyle = useAnimatedStyle(() => {
        const getOpacity = () => {
            if (isMenuOpen.value) {
                return withDelay(
                    300,
                    withTiming(isMenuOpen.value, {
                        duration: 100,
                        easing: Easing.inOut(Easing.ease),
                    }),
                );
            }
            return withTiming(isMenuOpen.value, {
                duration: 100,
                easing: Easing.inOut(Easing.ease),
            });
        };

        return {
            opacity: getOpacity(),
        };
    }, []);

    const iconStyle = useAnimatedStyle(() => {
        const getOpacity = () => {
            if (isMenuOpen.value) {
                return withTiming(isMenuOpen.value === 0 ? 1 : 0, {
                    duration: 100,
                    easing: Easing.inOut(Easing.ease),
                });
            }
            return withDelay(
                450,
                withTiming(isMenuOpen.value === 0 ? 1 : 0, {
                    duration: 100,
                    easing: Easing.inOut(Easing.ease),
                }),
            );
        };

        return {
            opacity: getOpacity(),
        };
    }, []);

    const handleToggleMenu = () => {
        if (!isMenuOpen.value) {
            buttonWidth.value = openValues.buttonWidth;
            buttonHeight.value = openValues.buttonHeight;
            buttonRadius.value = openValues.buttonRadius;
            isMenuOpen.value = openValues.isMenuOpen;
            return;
        }
        buttonWidth.value = defaultValues.buttonWidth;
        buttonHeight.value = defaultValues.buttonHeight;
        buttonRadius.value = defaultValues.buttonRadius;
        isMenuOpen.value = defaultValues.isMenuOpen;
    };

    return {
        myAnimatedContainer,
        quickStartContainerStyle,
        iconStyle,
        handleToggleMenu,
    };
};
