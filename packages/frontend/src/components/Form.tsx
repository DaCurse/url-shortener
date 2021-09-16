import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Tooltip,
} from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, MutableRefObject, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { APIError } from '../api/api-error';
import { LinkDTO } from '../api/link.dto';

function Form() {
  const [isValid, setIsValid] = useState(true);
  const urlInput = useRef() as MutableRefObject<HTMLInputElement>;
  const mutation = useMutation<
    AxiosResponse<LinkDTO>,
    AxiosError<APIError>,
    LinkDTO
  >((linkDto) => axios.post('/link/create', linkDto));

  const submitButton = (
    <Tooltip title="Send">
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Tooltip>
  );

  let statusMessage;
  switch (mutation.status) {
    case 'loading':
      statusMessage = <CircularProgress />;
      break;
    case 'error':
      const error = mutation.error.response?.data;
      statusMessage = (
        <Alert severity="error">
          Error: {error ? error.message : 'Unknown error'}
        </Alert>
      );
      break;
    case 'success':
      const { data: newLink } = mutation.data;
      const shortenedUrl = `${window.location.origin}/${newLink.code}`;
      const copyUrl = () => navigator.clipboard.writeText(shortenedUrl);
      const copyUrlButton = (
        <IconButton onClick={copyUrl}>
          <ContentCopyIcon />
        </IconButton>
      );

      statusMessage = (
        <Alert severity="success" action={copyUrlButton}>
          Link created:{' '}
          <Link href={shortenedUrl} target="_blank">
            {shortenedUrl}
          </Link>
        </Alert>
      );
      break;
  }

  function validateForm() {
    const isFormValid = urlInput.current.checkValidity();
    setIsValid(isFormValid);
    return isFormValid;
  }

  function handleChange() {
    validateForm();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (validateForm()) {
      mutation.mutate({
        url: urlInput.current.value,
      });
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        id="url"
        margin="normal"
        label="URL to shorten"
        type="url"
        autoComplete="url"
        autoFocus
        required
        error={!isValid}
        inputRef={urlInput}
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

      {statusMessage}
    </Box>
  );
}

export default Form;
