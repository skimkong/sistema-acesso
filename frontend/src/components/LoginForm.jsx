import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      // Buscar nome do usuário após login
      const profileResponse = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const profileData = await profileResponse.json();

      if (profileResponse.ok && profileData.user && profileData.user.name) {
        login(profileData.user.name, data.token); 
        navigate("/transacoes");
      } else {
        throw new Error("Erro ao buscar perfil do usuário");
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {erro && (
        <div className="text-red-600 text-sm text-center font-medium">
          {erro}
        </div>
      )}
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <Button color="blue">Entrar</Button>
    </form>
  );
}
