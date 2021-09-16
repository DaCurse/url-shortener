import { Box, Container } from '@mui/material';
import QueryStringError from '../containers/QueryStringError';
import Footer from './Footer';
import Form from './Form';
import Header from './Header';

function App() {
  return (
    <Container className="App" component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header />
        <Form />
        <Footer />
        <QueryStringError />
      </Box>
    </Container>
  );
}

export default App;
