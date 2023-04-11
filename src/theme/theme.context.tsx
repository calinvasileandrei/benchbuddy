import React from 'react';

import {DARK_THEME, DARK_THEME_ID} from './dark.theme';
import {LIGHT_THEME, LIGHT_THEME_ID} from './light.theme';
import {Theme} from 'src/theme/types';

interface ProvidedValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ProvidedValue>({
    theme: DARK_THEME,
    setTheme: () => {
        console.log('ThemeProvider is not rendered!');
    },
    toggleTheme: () => {
        console.log('ThemeProvider is not rendered!');
    },
});

export interface Props {
    initial: Theme;
    children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>(props => {
    const [theme, setTheme] = React.useState<Theme>(props.initial);

    const SetThemeCallback = React.useCallback((newTheme: Theme) => {
        setTheme((currentTheme: Theme) => {
            if (currentTheme.id === newTheme.id) {
                return currentTheme;
            }

            return newTheme;
        });
    }, []);

    const ToggleThemeCallback = React.useCallback(() => {
        setTheme(currentTheme => {
            if (currentTheme.id === LIGHT_THEME_ID) {
                return DARK_THEME;
            }
            if (currentTheme.id === DARK_THEME_ID) {
                return LIGHT_THEME;
            }
            return currentTheme;
        });
    }, []);

    const MemoizedValue = React.useMemo(() => {
        const value: ProvidedValue = {
            theme,
            setTheme: SetThemeCallback,
            toggleTheme: ToggleThemeCallback,
        };
        return value;
    }, [theme, SetThemeCallback, ToggleThemeCallback]);

    return (
        <ThemeContext.Provider value={MemoizedValue}>
            {props.children}
        </ThemeContext.Provider>
    );
});

export const useTheme = () => React.useContext(ThemeContext);
