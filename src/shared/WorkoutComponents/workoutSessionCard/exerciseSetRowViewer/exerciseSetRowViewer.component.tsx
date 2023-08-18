import React, {FC} from 'react'
import {Row} from 'src/shared/baseComponents/myGrid/row.component'
import {Col} from 'src/shared/baseComponents/myGrid/col.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model'
import {MyInputNumber} from 'src/shared/baseComponents/myInputNumber/myInputNumber.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {exerciseSetCreatorStyle} from 'src/shared/ExercisesComponents/exercieseSetRow/exerciseSetRow.style'
import {View} from 'react-native'
import {MyUnit} from '../../../advancedComponents/myUnit/myUnit.component'

export interface ExerciseSetRowProps {
    exerciseSet: ExerciseSetModel
    placeHolderSet?: ExerciseSetModel
    setNumber: number
}

export const ExerciseSetRowViewer: FC<ExerciseSetRowProps> = props => {
    const {exerciseSet, setNumber, placeHolderSet} = props
    const style = useThemeStyle(exerciseSetCreatorStyle)

    const getValue = (value: number) => {
        if (value !== 0) {
            return value
        }
        return undefined
    }

    return (
        <Row style={style.rowContainer}>
            <Col numRows={4} style={style.numberRow}>
                <View style={style.roundContainer}>
                    <MyText type={'captionText'} style={style.exerciseNumber}>
                        {`${(setNumber + 1).toString()}`}
                    </MyText>
                </View>
            </Col>
            <Col numRows={4}>
                <MyUnit typeOfText={'captionText'} type={'weight'} />
                <MyInputNumber
                    placeholder={placeHolderSet?.weight}
                    disabled={true}
                    onChangeNumber={() => 0}
                    textAlign={'center'}
                    value={getValue(exerciseSet.weight)}
                    style={{flex: 1, flexGrow: 1}}
                />
            </Col>
            <Col numRows={4}>
                <MyText type={'captionText'}>Reps</MyText>
                <MyInputNumber
                    placeholder={placeHolderSet?.reps}
                    disabled={true}
                    onChangeNumber={() => 0}
                    textAlign={'center'}
                    value={getValue(exerciseSet.reps)}
                    style={{flex: 1, flexGrow: 1}}
                />
            </Col>
            <Col numRows={4}>
                <MyText type={'captionText'}>Rest</MyText>
                <MyInputNumber
                    placeholder={placeHolderSet?.rest}
                    disabled={true}
                    onChangeNumber={() => 0}
                    textAlign={'center'}
                    value={getValue(exerciseSet.rest)}
                    style={{flex: 1, flexGrow: 1}}
                />
            </Col>
        </Row>
    )
}
