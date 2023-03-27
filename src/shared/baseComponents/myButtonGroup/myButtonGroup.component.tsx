import React, {FC, useState} from 'react';
import {View} from 'react-native'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {myButtonGroupStyle} from 'src/shared/baseComponents/myButtonGroup/myButtonGroup.style';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';

export interface MyButtonGroupProps {
    buttons: string[];
    onChange: (value: string) => void;
}

export const MyButtonGroup: FC<MyButtonGroupProps> = (props) => {
    const {buttons, onChange} = props;
    const style = useThemeStyle(myButtonGroupStyle)

    const [selectedIndex, setSelectedIndex] = useState(0);

    const getSelected = (index: number) => {
        if (index === selectedIndex) {
            return style.selected;
        }
        return {}
    }

    const handleSelection = (index: number, buttonValue: string) => {
        setSelectedIndex(index);
        onChange(buttonValue)
    }

    return (
        <View style={style.container}>
            {buttons.map((button, index) => {
                return (
                    <MyButton key={button} style={[style.item, getSelected(index)]}
                              onPress={() => handleSelection(index, button)}>{button}</MyButton>
                )
            })}
        </View>
    );
};
