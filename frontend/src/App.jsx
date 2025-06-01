import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TransacoesPage from './pages/TransacoesPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <AuthProvider>
      <Navbar /> {/* Navbar agora aparece em todas as páginas */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Rota para a Home */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transacoes" element={<PrivateRoute><TransacoesPage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}
