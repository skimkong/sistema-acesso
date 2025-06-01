import { motion } from "framer-motion";
import paymentsBlogpost from "../assets/payments-blogpost.webp"; 

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto mt-24 p-10 bg-white rounded-2xl shadow-2xl text-gray-900">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">
          Bem-vindo ao{" "}
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-block relative text-blue-700"
          >
            <span className="absolute inset-0 bg-blue-100 opacity-40 rounded-md -z-10"></span>
            Gerenciador de Transações
          </motion.span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
          Organize e acompanhe suas entradas e saídas com segurança. Faça login,
          registre seus dados e mantenha o controle financeiro na palma da mão.
        </p>
      </section>

      {/* Imagem integrada com borda arredondada inferior */}
      <div className="overflow-hidden rounded-b-2xl">
        <img
          src={paymentsBlogpost}
          alt="Payments Blogpost"
          className="w-full object-cover"
        />
      </div>
    </main>
  );
}
