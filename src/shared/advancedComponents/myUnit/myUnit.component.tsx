import React, {FC} from 'react'
import {useAppSelector} from '../../../store/store'
import {settingsSelectors} from '../../../store/settings/settings.selector'
import {MyText} from '../../baseComponents/myText/myText.component'
import {TypeOfText} from '../../../theme/types'
import {UnitModel} from '../../../models/unit.model'

export type TypeOfUnit = 'weight' | 'height'
export interface MyUnitProps {
    typeOfText?: TypeOfText
    type?: TypeOfUnit
    overrideUnit?: UnitModel
}

export const MyUnit: FC<MyUnitProps> = props => {
    const {type = 'weight', overrideUnit} = props
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
        if (overrideUnit && overrideUnit !== unit) {
            return overrideUnit === 'Imperial' ? getImperialUnit() : getMetricUnit()
        }

        if (unit === 'Imperial') {
            return getImperialUnit()
        }
        return getMetricUnit()
    }

    return <MyText type={props.typeOfText}>{getValue()}</MyText>
}
