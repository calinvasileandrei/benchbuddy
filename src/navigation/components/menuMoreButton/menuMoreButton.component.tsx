import React, {FC} from 'react';
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component';
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {menuMoreButtonStyle} from 'src/navigation/components/menuMoreButton/menuMoreButton.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {View} from 'react-native';

export interface OptionMenu {
    title: string;
    iconName: string;
    onPress: () => void;
}

export interface MenuMoreButtonProps {
    options: OptionMenu[];
}

export const MenuMoreButton: FC<MenuMoreButtonProps> = props => {
    const style = useThemeStyle(menuMoreButtonStyle);

    const optionsStyles = {
        optionsContainer: style.optionsContainer,
        optionsWrapper: {},
        optionWrapper: style.optionWrapper,
        optionTouchable: {},
        optionText: {},
    };

    const triggerStyles = {
        triggerWrapper: {
            ...style.triggerWrapper,
        },
    };

    const handlePress = (onPressProp: any) => {
        onPressProp();
    };

    return (
        <Menu
            style={style.menuContainer}
            rendererProps={{anchorStyle: style.anchorStyle}}
            onSelect={handlePress}>
            <MenuTrigger customStyles={triggerStyles}>
                <MyIcon
                    color={style.moreIcon.color}
                    iconName={'ellipsis-horizontal-outline'}
                />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                {props.options.map((option, index) => {
                    return (
                        <MenuOption key={option.title} value={option.onPress}>
                            <View style={style.containerRow}>
                                <MyText style={style.menuOptionItem}>
                                    {option.title}
                                </MyText>
                                <MyIcon iconName={option.iconName} />
                            </View>
                        </MenuOption>
                    );
                })}
            </MenuOptions>
        </Menu>
    );
};
