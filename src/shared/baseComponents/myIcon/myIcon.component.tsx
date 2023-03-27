import React, {FC} from 'react';
import {Icon} from '@rneui/themed';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myIconStyle} from 'src/shared/baseComponents/myIcon/myIcon.style';
import {handleHaptic, HapticType} from 'src/utils/haptics.utils';

export interface MyIconProps {
    iconName: string,
    size?: number
    onPress?: () => void
    color?: string
    withHaptics?: HapticType;
}

export const MyIcon: FC<MyIconProps> = (props) => {
    const style = useThemeStyle(myIconStyle)

    const handleOnPress = () => {
        if (props.onPress) {
            props.onPress();
            handleHaptic(props.withHaptics)
        }
    }


    return (
        <Icon type="ionicon" onPress={props.onPress? handleOnPress: undefined} size={props.size} name={props.iconName}
              color={props.color || style.icon.color}/>
    );
};
