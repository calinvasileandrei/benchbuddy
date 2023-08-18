import React, {FC} from 'react'
import {View} from 'react-native'
import {MyUnit, MyUnitProps} from '../../myUnit.component'
import {MyText} from '../../../../baseComponents/myText/myText.component'
import {useThemeStyle} from '../../../../../theme/useThemeStyle.hook'
import {myUnitWithValueStyle} from './myUnitWithValue.style'

interface MyUnitWithValueProps extends MyUnitProps {
    value: string | number
}

export const MyUnitWithValue: FC<MyUnitWithValueProps> = props => {
    const style = useThemeStyle(myUnitWithValueStyle)
    return (
        <View style={style.container}>
            <MyText type={props.typeOfText}>{`${props.value} `}</MyText>
            <MyUnit typeOfText={props.typeOfText} type={props.type} />
        </View>
    )
}
