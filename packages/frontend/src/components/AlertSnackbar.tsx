import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const AUTO_HIDE_DURATION = 5000;

interface AlertSnackbarProps {
  message: string;
  severity?: AlertColor;
}

function AlertSnackbar({ message, severity }: AlertSnackbarProps) {
  const [open, setOpen] = useState(true);

  function handleClose(
    _event: SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertSnackbar;
