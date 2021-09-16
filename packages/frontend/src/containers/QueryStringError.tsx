import AlertSnackbar from '../components/AlertSnackbar';
import errors, { ErrorType } from '../utils/errors';

const PARAM_NAME = 'error';

function QueryStringError() {
  const queryParms = new URLSearchParams(window.location.search);
  const error = queryParms.get(PARAM_NAME);

  if (error && errors.hasOwnProperty(error)) {
    const errorMessage = errors[error as ErrorType];
    return <AlertSnackbar message={errorMessage} severity="error" />;
  }

  return null;
}

export default QueryStringError;
