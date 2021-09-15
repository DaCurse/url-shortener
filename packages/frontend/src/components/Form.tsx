import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';

function Form() {
  const submitButton = (
    <Tooltip title="Send">
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Tooltip>
  );

  function handleSubmit() {}

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        id="url"
        margin="normal"
        fullWidth
        label="URL to shorten"
        type="url"
        autoComplete="url"
        autoFocus
        required
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
