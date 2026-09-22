import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box>
      {!isLoginPage && <Navbar />}
      <AppRoutes />
    </Box>
  );
}

export default App;
