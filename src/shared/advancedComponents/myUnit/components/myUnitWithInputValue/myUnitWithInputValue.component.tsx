import React, {FC} from 'react'
import {View} from 'react-native'
import {MyUnit, MyUnitProps} from '../../myUnit.component'
import {useThemeStyle} from '../../../../../theme/useThemeStyle.hook'
import {myUnitWithInputValueStyle} from './myUnitWithInputValue.style'
import {MyInput} from '../../../../baseComponents/myInput/myInput.component'

interface MyUnitWithInputValueProps extends MyUnitProps {
    value?: string
    setValue: (value?: number) => void
}

export const MyUnitWithInputValue: FC<MyUnitWithInputValueProps> = props => {
    const style = useThemeStyle(myUnitWithInputValueStyle)

    const handleSetNumber = (value: string, setter: (v: number | undefined) => void) => {
        if (value.length > 0 && !isNaN(parseInt(value, 10))) {
            return setter(parseInt(value, 10))
        }
        return setter(undefined)
    }

    return (
        <View style={style.container}>
            <MyInput
                style={style.input}
                value={props.value || ''}
                containerStyle={{borderBottomWidth: 0, paddingVertical: 0, marginVertical: 0}}
                keyboardType={'numeric'}
                onChangeText={v => handleSetNumber(v, props.setValue)}
                placeholder={'Weight'}
            />
            <View style={style.unit}>
                <MyUnit typeOfText={props.typeOfText} type={props.type} />
            </View>
        </View>
    )
}
