import { Box, Container } from '@mui/material';
import Header from './Header';

function App() {
  return (
    <Container className="App" component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header />
      </Box>
    </Container>
  );
}

export default App;
