import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, ButtonGroup, IconButton, Tooltip } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';

function Footer() {
  return (
    <Box sx={{ mt: 4 }}>
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
    </Box>
  );
}

export default Footer;
