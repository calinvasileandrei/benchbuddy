import React, {FC} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet, View, ViewProps} from 'react-native'
import {useTheme} from 'src/theme/theme.context'

/**
 * This component was made to solve the performance problem of the SafeAreaView component
 * from the react-native/react-native-safe-area-context library.
 * The native library can't perform correctly and calculate where to place the paddings when it's used
 * on heavy pages. This performance issue makes the Ui bounce when the first screen appears.
 * The hook useSafeAreaInsets() from the react-native-safe-area-context doesn't have this performance issue,
 * so we can use it to calculate and add the paddings manually to our view.
 * The usage is the same as the SafeAreaView component, you have only to specify where to apply the
 * safe areas.
 */

type Edge = 'top' | 'right' | 'bottom' | 'left'

export type MySafeAreaViewProps = ViewProps & {
    children?: React.ReactNode
    mode?: 'padding' | 'margin'
    edges?: ReadonlyArray<Edge>
}

export const MySafeAreaView: FC<MySafeAreaViewProps> = ({
    edges,
    mode,
    style,
    children,
    ...rest
}) => {
    const insets = useSafeAreaInsets()
    const theme = useTheme()

    const safeAreaViewStyle = StyleSheet.create({
        marginStyle: {
            marginTop: !edges || edges.includes('top') ? insets.top : 0,
            marginLeft: !edges || edges.includes('left') ? insets.left : 0,
            marginRight: !edges || edges.includes('right') ? insets.right : 0,
            marginBottom: !edges || edges.includes('bottom') ? insets.bottom : 0
        },
        paddingStyle: {
            paddingTop: !edges || edges.includes('top') ? insets.top : 0,
            paddingLeft: !edges || edges.includes('left') ? insets.left : 0,
            paddingRight: !edges || edges.includes('right') ? insets.right : 0,
            paddingBottom: !edges || edges.includes('bottom') ? insets.bottom : 0
        }
    })

    return (
        <View
            {...rest}
            style={[
                {
                    backgroundColor: theme.theme.color.background,
                    flex: 1
                },
                style,
                mode == 'margin' ? safeAreaViewStyle.marginStyle : safeAreaViewStyle.paddingStyle
            ]}>
            {children}
        </View>
    )
}
