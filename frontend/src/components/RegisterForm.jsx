import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }

      // Se o backend retornar token no cadastro
      if (data.token) {
        localStorage.setItem("token", data.token);

        // Buscar nome do usuário
        const profileRes = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const profileData = await profileRes.json();

        if (profileRes.ok && profileData.user?.nome) {
          localStorage.setItem("username", profileData.user.nome);
        }

        navigate("/transacoes");
      } else {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      }
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
      <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      <Button color="green">Cadastrar</Button>
    </form>
  );
}
