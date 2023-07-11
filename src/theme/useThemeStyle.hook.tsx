import React from 'react'
import {Theme} from 'src/theme/types'
import {useTheme} from 'src/theme/theme.context'

type Generator<T extends {}> = (theme: Theme) => T

export const useThemeStyle = <T extends {}>(fn: Generator<T>) => {
    const {theme} = useTheme()

    return React.useMemo(() => fn(theme), [fn, theme])
}
