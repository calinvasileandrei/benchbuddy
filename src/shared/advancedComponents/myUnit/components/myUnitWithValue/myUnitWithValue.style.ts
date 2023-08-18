import {Theme} from '../../../../../theme/types'
import {StyleSheet} from 'react-native'

export const myUnitWithValueStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row'
        }
    })
