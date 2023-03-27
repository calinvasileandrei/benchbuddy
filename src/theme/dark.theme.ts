import {ColorTheme, Theme} from 'src/theme/types';
import {
    BORDER_RADIUS_THEME,
    FONT_FAMILY_THEME,
    FONT_SIZE_THEME,
    ICON_SIZE_THEME,
    SPACING_THEME
} from 'src/theme/defaults.theme';

const DARK_COLOR_THEME: ColorTheme = {
    primary: '#517CFE',
    onPrimary: '#CCCBCB',
    primaryDark: '#354C8C',
    surface: '#262725',
    onSurface: '#FFF',
    background: '#1A1A1A',
    transparent: 'transparent',
    border: '#C6DCD3',
    placeholder: '#b2b7b3',
    danger: '#FF0000',
};

export const DARK_THEME_ID = 'default-dark';

export const DARK_THEME: Theme = {
    id: DARK_THEME_ID,
    color: DARK_COLOR_THEME,
    spacing: SPACING_THEME,
    fontSize: FONT_SIZE_THEME,
    fontWeight: FONT_FAMILY_THEME,
    iconSize: ICON_SIZE_THEME,
    borderRadius: BORDER_RADIUS_THEME
};
