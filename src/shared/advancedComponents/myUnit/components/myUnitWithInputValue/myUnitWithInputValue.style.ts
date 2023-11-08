import {Theme} from '../../../../../theme/types'
import {StyleSheet} from 'react-native'

export const myUnitWithInputValueStyle = (theme: Theme) =>
    StyleSheet.create({
        input: {paddingVertical: 0, marginVertical: 0},
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            borderBottomWidth: 1,
            borderBottomColor: theme.color.placeholder,
            height: 40,
            paddingHorizontal: theme.spacing.base,
            marginVertical: theme.spacing.double,
            marginHorizontal: theme.spacing.base
        },
        unit: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 40
        }
    })
