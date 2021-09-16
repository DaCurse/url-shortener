import LinkIcon from '@mui/icons-material/Link';
import { Avatar, Typography } from '@mui/material';
import { ReactElement } from 'react';

function Header(): ReactElement {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'info.dark' }}>
        <LinkIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        URL Shortener
      </Typography>
    </>
  );
}

export default Header;
