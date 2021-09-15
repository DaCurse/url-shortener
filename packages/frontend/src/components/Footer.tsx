import GitHubIcon from '@mui/icons-material/GitHub';
import { ButtonGroup, IconButton, Tooltip } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';

function Footer() {
  return (
    <ButtonGroup>
      <Tooltip title="View source">
        <IconButton
          aria-label="GitHub Repository"
          href="https://github.com/DaCurse/url-shortener"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <ThemeSwitcher />
    </ButtonGroup>
  );
}

export default Footer;
