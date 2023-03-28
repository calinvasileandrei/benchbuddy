import React, {FC} from 'react';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {TabItemStyle} from 'src/navigation/components/tabItem/tabItem.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';

export interface TabItemProps {
    title: string;
    focused: boolean;
}

export const TabItem: FC<TabItemProps> = props => {
    const style = useThemeStyle(TabItemStyle);
    const textStyle = props.focused ? style.labelFocus : style.label;
    return (
        <MyText type={'captionText'} style={textStyle}>
            {props.title}
        </MyText>
    );
};
