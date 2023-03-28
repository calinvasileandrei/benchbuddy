export interface ColorTheme {
    primary: string;
    onPrimary: string;
    primaryDark: string;
    surface: string;
    onSurface: string;
    background: string;
    transparent: string;
    border: string;
    placeholder: string;
    danger: string;
}

export interface SpacingTheme {
    xsmall: number;
    small: number;
    base: number;
    double: number;
}

export interface BorderRadiusTheme {
    small: number;
    base: number;
    double: number;
}

export interface FontSizeTheme {
    xxxxsmall: number;
    xxxsmall: number;
    xxsmall: number;
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
    xxxlarge: number;
}

export interface IconSizeTheme {
    xxxsmall: number;
    xxsmall: number;
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
}

export type reactNativeFontsWeights =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

export interface FontWeightTheme {
    regular: reactNativeFontsWeights;
    medium: reactNativeFontsWeights;
    bold: reactNativeFontsWeights;
}

export interface Theme {
    id: string;
    color: ColorTheme;
    spacing: SpacingTheme;
    fontSize: FontSizeTheme;
    fontWeight: FontWeightTheme;
    iconSize: IconSizeTheme;
    borderRadius: BorderRadiusTheme;
}

export type TypeOfText =
    | 'header1Text'
    | 'header2Text'
    | 'header3Text'
    | 'header4Text'
    | 'header5Text'
    | 'header6Text'
    | 'bodyText'
    | 'bodyBoldText'
    | 'labelText'
    | 'captionText';
