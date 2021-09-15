import { createContext } from 'react';
import { DEFAULT_THEME, ThemeName } from '../utils/themes';

export interface CustomThemeContextValue {
  currentTheme: ThemeName;
  setTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
}

const CustomThemeContext = createContext<CustomThemeContextValue>({
  currentTheme: DEFAULT_THEME,
  setTheme: () => {},
});

export default CustomThemeContext;
