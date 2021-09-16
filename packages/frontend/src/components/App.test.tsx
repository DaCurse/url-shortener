import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient();

it('renders without crashing', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
});
