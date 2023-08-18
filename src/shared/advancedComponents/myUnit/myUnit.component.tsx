import React, {FC} from 'react'
import {useAppSelector} from '../../../store/store'
import {settingsSelectors} from '../../../store/settings/settings.selector'
import {MyText} from '../../baseComponents/myText/myText.component'
import {TypeOfText} from '../../../theme/types'

type TypeOfUnit = 'weight' | 'height'
export interface MyUnitProps {
    typeOfText?: TypeOfText
    type?: TypeOfUnit
}

export const MyUnit: FC<MyUnitProps> = props => {
    const {type = 'weight'} = props
    const unit = useAppSelector(settingsSelectors.getUnit)

    const getMetricUnit = () => {
        if (type === 'weight') {
            return 'kg'
        }
        return 'cm'
    }

    const getImperialUnit = () => {
        if (type === 'weight') {
            return 'lbs'
        }
        return 'in'
    }

    const getValue = () => {
        if (unit === 'Imperial') {
            return getImperialUnit()
        }
        return getMetricUnit()
    }

    return <MyText type={props.typeOfText}>{getValue()}</MyText>
}
