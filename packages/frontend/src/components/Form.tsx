import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

function Form() {
  const [isValid, setIsValid] = useState(true);

  const submitButton = (
    <Tooltip title="Send">
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Tooltip>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsValid(e.currentTarget.checkValidity());
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isValid) {
      // TODO: Request API
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        id="url"
        margin="normal"
        fullWidth
        label="URL to shorten"
        type="url"
        autoComplete="url"
        autoFocus
        required
        error={!isValid}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InsertLinkIcon />
            </InputAdornment>
          ),
          endAdornment: submitButton,
        }}
      />
    </Box>
  );
}

export default Form;
