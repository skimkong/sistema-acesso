export default function TransacoesPage() {
  return (
    <main className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Suas Transações
      </h1>
      {/* Aqui você pode adicionar seu conteúdo de transações */}
      <p className="text-center text-gray-600">
        Nenhuma transação cadastrada ainda.
      </p>
      <p className="text-center text-gray-600 mb-4">
        Nenhuma transação cadastrada ainda.
      </p>
      <button className="block mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Adicionar Transação
      </button>
    </main>
  );
}
