import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react';
import CustomThemeContext from '../context/CustomThemeContext';

function ThemeSwitcher() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const icon =
    currentTheme === 'light' ? <Brightness7Icon /> : <Brightness2Icon />;

  function handleClick() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <Tooltip title="Toggle theme">
      <IconButton aria-label="Toggle theme" onClick={handleClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
