import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native'
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {MenuItemStyle} from 'src/screens/app/account/components/menuItem/menuItem.style';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';

export interface MenuItemProps {
    onPress: () => void,
    title: string,
    disabled?: boolean,
    iconName?: string,
}

export const MenuItem: FC<MenuItemProps> = (props) => {
    const style = useThemeStyle(MenuItemStyle)
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
            <View style={style.container}>
                {props.iconName && <MyIcon iconName={props.iconName} /> }
                <MyText style={props.disabled? style.itemDisabled:style.item}>{props.title}</MyText>
            </View>
        </TouchableOpacity>
    );
};
