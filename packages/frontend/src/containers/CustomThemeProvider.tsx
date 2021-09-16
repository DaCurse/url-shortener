import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import CustomThemeContext, {
  CustomThemeContextValue,
} from '../context/CustomThemeContext';
import themes, { DEFAULT_THEME, ThemeName } from '../utils/themes';

const STORED_THEME_KEY = 'theme';

interface CustomThemeProviderProps {
  theme?: ThemeName;
  children: React.ReactNode;
}

function CustomThemeProvider(props: CustomThemeProviderProps) {
  const storedThemeName = localStorage.getItem(STORED_THEME_KEY);
  const initialThemeName = props.theme
    ? props.theme
    : storedThemeName && themes.hasOwnProperty(storedThemeName)
    ? (storedThemeName as ThemeName)
    : DEFAULT_THEME;
  const [themeName, setThemeName] = useState(initialThemeName);
  const theme = themes[themeName];
  const contextValue: CustomThemeContextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  useEffect(() => {
    localStorage.setItem(STORED_THEME_KEY, themeName);
  }, [themeName]);

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export default CustomThemeProvider;
