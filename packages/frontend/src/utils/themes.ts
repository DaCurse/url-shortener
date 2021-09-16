import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export type ThemeName = keyof typeof themes;
export const DEFAULT_THEME: ThemeName = 'dark';
export default themes;
