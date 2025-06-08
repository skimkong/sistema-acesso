import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token"); // Verifica se o token está presente

  return user && token ? children : <Navigate to="/login" />;
}