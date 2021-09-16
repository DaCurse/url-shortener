import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Tooltip } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';

function Footer() {
  return (
    <Box sx={{ mt: 4 }}>
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
    </Box>
  );
}

export default Footer;
