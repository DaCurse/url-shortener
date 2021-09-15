import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton, Tooltip } from '@mui/material';

function Footer() {
  return (
    <>
      <Tooltip title="View source">
        <IconButton
          aria-label="GitHub Repository"
          href="https://github.com/DaCurse/url-shortener"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default Footer;
