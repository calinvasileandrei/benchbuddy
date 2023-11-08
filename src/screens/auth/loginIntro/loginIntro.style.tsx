import {Theme} from 'src/theme/types'
import {StyleSheet} from 'react-native'

export const loginIntroStyle = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: theme.color.background,
            justifyContent: 'space-between',
            flexDirection: 'column'
        },
        topContainer: {
            flex: 1,
            paddingHorizontal: theme.spacing.double,
            backgroundColor: theme.color.onSurface,
            borderBottomEndRadius: theme.borderRadius.double,
            borderBottomStartRadius: theme.borderRadius.double
        },
        bottomContainer: {
            flex: 1,
            marginTop: theme.spacing.double,
            paddingHorizontal: theme.spacing.double
        },
        logoText: {
            color: theme.color.onSurface,
            fontSize: theme.fontSize.xxlarge,
            fontWeight: theme.fontWeight.bold
        },
        rightTextContainer: {
            justifyContent: 'flex-end',
            textAlign: 'center',
            flexDirection: 'row-reverse'
        },
        cardRight: {
            borderRadius: theme.borderRadius.base,
            backgroundColor: theme.color.onSurface,
            color: theme.color.surface,
            marginVertical: theme.spacing.base,
            marginHorizontal: theme.spacing.base,
            paddingHorizontal: theme.spacing.double,
            paddingVertical: theme.spacing.base,
            borderBottomEndRadius: 0
        },
        cardLightMessage: {
            color: theme.color.surface
        },
        cardLeft: {
            borderRadius: theme.borderRadius.base,
            backgroundColor: theme.color.surface,
            marginVertical: theme.spacing.base,
            marginHorizontal: theme.spacing.base,
            paddingHorizontal: theme.spacing.double,
            paddingVertical: theme.spacing.base,
            borderBottomStartRadius: 0
        },
        pagerView: {
            flex: 1
        },
        dotContainer: {
            position: 'absolute',
            width: '100%',
            bottom: 20
        },
        dotRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: theme.spacing.double,
            marginBottom: theme.spacing.base
        },
        dots: {
            width: 100
        },
        imageContainer: {
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            height: 300,
            width: 300
        }
    })
