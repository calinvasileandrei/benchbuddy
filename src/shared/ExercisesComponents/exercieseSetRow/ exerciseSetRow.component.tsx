import React, {FC, useEffect, useState} from 'react'
import {Row} from 'src/shared/baseComponents/myGrid/row.component'
import {Col} from 'src/shared/baseComponents/myGrid/col.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {ExerciseSetModel} from 'src/models/schema/exerciseSet.model'
import {MyInputNumber} from 'src/shared/baseComponents/myInputNumber/myInputNumber.component'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {exerciseSetCreatorStyle} from 'src/shared/ExercisesComponents/exercieseSetRow/exerciseSetRow.style'
import {TouchableOpacity, View} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {MyIcon} from 'src/shared/baseComponents/myIcon/myIcon.component'
import {handleHaptic} from 'src/utils/haptics.utils'
import {MyAnimatedIcon} from 'src/shared/ExercisesComponents/exercieseSetRow/components/myAnimatedIcon/myAnimatedIcon.component'
import {Logger} from 'src/utils/logger'

export interface ExerciseSetRowProps {
    exerciseSet: ExerciseSetModel
    placeHolderSet?: ExerciseSetModel
    setExerciseSet: (set: ExerciseSetModel, index: number) => void
    removeExerciseSet?: (index: number) => void
    setNumber: number
    withFastSet?: boolean
}

const logger = new Logger('ExerciseSetRow')

export const ExerciseSetRow: FC<ExerciseSetRowProps> = props => {
    const {exerciseSet, setExerciseSet, setNumber, placeHolderSet, withFastSet, removeExerciseSet} =
        props
    const style = useThemeStyle(exerciseSetCreatorStyle)
    const [isFastSet, setIsFastSet] = useState<boolean>(false)

    useEffect(() => {
        const hasFastSet =
            (withFastSet === true &&
                placeHolderSet &&
                !exerciseSet.weight &&
                !exerciseSet.reps &&
                !exerciseSet.rest) ||
            false
        setIsFastSet(hasFastSet)
        logger.debug('isFastSet', hasFastSet)
    }, [])

    const numRows = 4

    const handleChange = (newSet: ExerciseSetModel) => {
        setExerciseSet(newSet, setNumber)
    }

    const getValue = (value: number) => {
        if (value !== 0) {
            return value
        }
        return undefined
    }
    const rightSwipeActions = () => {
        if (!removeExerciseSet || setNumber === 0) {
            return null
        }
        return (
            <View style={style.deleteButton}>
                <TouchableOpacity onPress={() => removeExerciseSet(setNumber)}>
                    <Col numRows={1}>
                        <MyIcon
                            iconName={'trash-outline'}
                            size={20}
                            color={style.deleteText.color}
                        />
                        <MyText type={'captionText'} style={style.deleteText}>
                            Delete
                        </MyText>
                    </Col>
                </TouchableOpacity>
            </View>
        )
    }

    const handleSetFastSet = () => {
        handleChange({
            ...exerciseSet,
            weight: placeHolderSet?.weight || 0,
            reps: placeHolderSet?.reps || 0,
            rest: placeHolderSet?.rest || 0
        })
        handleHaptic('success')
    }

    return (
        <Swipeable renderRightActions={rightSwipeActions} containerStyle={{flex: 1}}>
            <Row style={style.rowContainer}>
                <Col numRows={numRows} style={style.numberRow}>
                    <View style={style.roundContainer}>
                        <MyText type={'captionText'} style={style.exerciseNumber}>
                            {`${(setNumber + 1).toString()}`}
                        </MyText>
                    </View>
                </Col>
                <Col numRows={numRows}>
                    <MyText type={'captionText'}>Kg</MyText>
                    <MyInputNumber
                        placeholder={placeHolderSet?.weight}
                        disabled={!setExerciseSet}
                        textAlign={'center'}
                        onChangeNumber={weight => handleChange({...exerciseSet, weight})}
                        value={getValue(exerciseSet.weight)}
                        style={{flex: 1, flexGrow: 1}}
                    />
                </Col>
                <Col numRows={numRows}>
                    <MyText type={'captionText'}>Reps</MyText>
                    <MyInputNumber
                        placeholder={placeHolderSet?.reps}
                        disabled={!setExerciseSet}
                        textAlign={'center'}
                        onChangeNumber={reps => handleChange({...exerciseSet, reps})}
                        value={getValue(exerciseSet.reps)}
                        style={{flex: 1, flexGrow: 1}}
                    />
                </Col>
                <Col numRows={numRows}>
                    <Row style={{flex: 1, alignItems: 'center'}}>
                        <Col numRows={1}>
                            <MyText type={'captionText'}>Rest</MyText>
                            <MyInputNumber
                                placeholder={placeHolderSet?.rest}
                                disabled={!setExerciseSet}
                                textAlign={'center'}
                                onChangeNumber={rest => handleChange({...exerciseSet, rest})}
                                value={getValue(exerciseSet.rest)}
                                style={{flex: 1, flexGrow: 1}}
                            />
                        </Col>
                        {isFastSet && (
                            <MyAnimatedIcon
                                iconName={'checkmark-outline'}
                                onPress={handleSetFastSet}
                            />
                        )}
                    </Row>
                </Col>
            </Row>
        </Swipeable>
    )
}
