import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const [username, setUsername] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    setHeight(isOpen ? "120px" : "0px");
  }, [isOpen]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName"); // ✅ Pegando o nome corretamente
    setUsername(storedName);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUsername(null); // ✅ Atualiza o estado para limpar a interface

    navigate("/login"); // 🚀 Redireciona para a página de login
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
        <div className="flex-shrink-0 font-extrabold text-xl tracking-wide">
          <Link to="/">Gestão de Transações</Link>
        </div>

        <div className="hidden md:flex space-x-10 font-semibold text-lg items-center">
          <Link to="/" className="hover:text-indigo-300 transition-colors duration-300">Home</Link>

          {username && location.pathname !== "/login" && ( // ✅ Esconde o botão na tela de login
            <>
              <Link to="/transacoes" className="hover:text-indigo-300 transition-colors duration-300">Transações</Link>
              <span className="text-sm font-medium">Bem-vindo, {username}!</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300">
                Sair
              </button>
            </>
          )}
          
          {!username && (
            <>
              <Link to="/login" className="hover:text-indigo-300 transition-colors duration-300">Login</Link>
              <Link to="/register" className="hover:text-indigo-300 transition-colors duration-300">Cadastro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}