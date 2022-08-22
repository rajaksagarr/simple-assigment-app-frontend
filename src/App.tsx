import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from './Router';
import { Container } from 'react-bootstrap';
const queryClient = new QueryClient()

function App() {
  return (
    <Container fluid>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <AppRouter></AppRouter>
      </QueryClientProvider>
    </Container>

  );
}

export default App;
