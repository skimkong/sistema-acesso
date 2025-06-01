import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">Login</h1>
     <p className="text-sm text-center text-gray-600 mb-4">
      Ainda não tem uma conta? <a href="/register" className="text-blue-600 hover:underline">Cadastre-se</a>
      </p>
      <LoginForm />
    </main>
  );
}
