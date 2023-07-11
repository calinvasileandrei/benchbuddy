import React, {FC} from 'react'
import {View, ViewStyle} from 'react-native'

export interface RowProps {
    children: React.ReactNode
    style?: ViewStyle
}

export const Row: FC<RowProps> = ({children, style}) => {
    return <View style={[{flexDirection: 'row'}, style]}>{children}</View>
}
