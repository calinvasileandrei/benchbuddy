import React, {FC} from 'react'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {tabIconStyle} from 'src/navigation/components/tabIcon/tabIcon.style'
import {Icon} from '@rneui/themed'

export interface TabIconProps {
    iconName: string
    focused: boolean
}

export const TabIcon: FC<TabIconProps> = props => {
    const style = useThemeStyle(tabIconStyle)
    const iconStyle = props.focused ? style.iconFocus : style.icon
    return <Icon type="ionicon" size={20} name={props.iconName} color={iconStyle.color} />
}
