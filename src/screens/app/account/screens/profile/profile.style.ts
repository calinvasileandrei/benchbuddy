import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const profileStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {},
        profileImageContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: theme.spacing.double
        },
        nameContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: theme.spacing.base
        },
        headers: {
            marginTop: theme.spacing.double,
            marginHorizontal: theme.spacing.base
        }
    })
