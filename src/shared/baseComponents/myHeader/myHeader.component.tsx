import React, {FC} from 'react';
import {View, ViewProps} from 'react-native';
import {myHeaderStyle} from 'src/shared/baseComponents/myHeader/myHeader.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Logger} from 'src/utils/logger';

export interface MyHeaderProps {
  title: string;
  animatedOffsetY?: SharedValue<number>;
  style?: ViewProps['style'];
}

const logger = new Logger('MyHeader');
export const MyHeader: FC<MyHeaderProps> = props => {
  const style = useThemeStyle(myHeaderStyle);

  const {animatedOffsetY} = props;

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedOffsetY) {
      return {
        transform: [
          {
            scale: interpolate(
              animatedOffsetY.value,
              [0, -20],
              [1, 1.2],
              Extrapolate.CLAMP,
            ),
          },
          {
            translateX: interpolate(
              animatedOffsetY.value,
              [0, -21],
              [0, 30],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }
    return {};
  });

  return (
    <View style={[style.container, props.style]}>
      <MyText style={animatedStyle} type={'header1Text'}>
        {props.title}
      </MyText>
    </View>
  );
};
