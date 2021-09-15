import { Box, Button, TextField } from '@mui/material';

function Form() {
  function handleSubmit() {}

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="url"
        label="URL to shorten"
        type="url"
        name="url"
        autoComplete="url"
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Shorten
      </Button>
    </Box>
  );
}

export default Form;
