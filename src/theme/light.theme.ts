import {ColorTheme, Theme} from 'src/theme/types'
import {
    BORDER_RADIUS_THEME,
    FONT_FAMILY_THEME,
    FONT_SIZE_THEME,
    ICON_SIZE_THEME,
    SPACING_THEME
} from 'src/theme/defaults.theme'

const LIGHT_COLOR_THEME: ColorTheme = {
    primary: '#03a9f4',
    onPrimary: '#fff',
    primaryDark: '#0288d1',
    surface: '#fff',
    onSurface: '#000',
    background: '#CBD8E6',
    transparent: 'transparent',
    border: '#C6DCD3',
    placeholder: '#b2b7b3',
    danger: '#FF0000'
}

export const LIGHT_THEME_ID = 'default-light'

export const LIGHT_THEME: Theme = {
    id: LIGHT_THEME_ID,
    color: LIGHT_COLOR_THEME,
    spacing: SPACING_THEME,
    fontSize: FONT_SIZE_THEME,
    fontWeight: FONT_FAMILY_THEME,
    iconSize: ICON_SIZE_THEME,
    borderRadius: BORDER_RADIUS_THEME
}
