import React, {FC} from 'react';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Logger} from 'src/utils/logger';
import {ScrollViewProps, View} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myScrollViewStyle} from 'src/shared/baseComponents/myScrollView/myScrollView.style';

export interface MyScrollViewProps {
  title?: string;
  children: React.ReactNode;
  style?: ScrollViewProps['style'];
  horizontal?: boolean;
}

const logger = new Logger('MyScrollView');
export const MyScrollView: FC<MyScrollViewProps> = props => {
  const style = useThemeStyle(myScrollViewStyle);

  const animatedOffsetY = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      animatedOffsetY.value = event.contentOffset.y;
    },
  });

  if (props.horizontal) {
    return (
      <>
        {props.title && (
          <View style={style.headerContainer}>
            <MyHeader title={props.title} animatedOffsetY={animatedOffsetY} />
          </View>
        )}
        <Animated.ScrollView
          style={props.style}
          onScroll={scrollHandler}
          horizontal={props.horizontal}
          scrollEventThrottle={16}>
          {props.children}
        </Animated.ScrollView>
      </>
    );
  }

  return (
    <Animated.ScrollView
      style={props.style}
      onScroll={scrollHandler}
      horizontal={props.horizontal}
      scrollEventThrottle={16}>
      {props.title && (
        <View style={style.headerContainer}>
          <MyHeader title={props.title} animatedOffsetY={animatedOffsetY} />
        </View>
      )}
      {props.children}
    </Animated.ScrollView>
  );
};
