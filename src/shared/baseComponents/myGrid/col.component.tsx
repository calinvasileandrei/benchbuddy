import React, {FC} from 'react'
import {View, ViewStyle} from 'react-native'
import {gridStyle} from 'src/shared/baseComponents/myGrid/grid.style'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'

export interface ColProps {
    numRows: number
    children: React.ReactNode
    style?: ViewStyle
}

export const Col: FC<ColProps> = ({numRows, children, style}) => {
    const styles = useThemeStyle(gridStyle)

    return <View style={[{...styles.col, flex: numRows}, style]}>{children}</View>
}
