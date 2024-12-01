import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

type Professional = {
  id: number;
  name: string;
  email: string;
  profession: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch("http://localhost:3001/professionals");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Professional[] = await response.json();
        setProfessionals(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-snug">
          <span className="block">
            <span className="text-gray-700">Conheça</span>{" "}
            <span className="text-black underline decoration-teal-500 decoration-4">
              Nossos Profissionais
            </span>
          </span>
        </h1>
        <p className="text-center text-lg text-gray-600 italic mb-6">
          Experiência e dedicação ao seu alcance. Veja nosso time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              className="bg-black text-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-gray-500 transition duration-300"
            >
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-2 text-center uppercase tracking-wide">
                  {professional.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  Profissão: {professional.profession}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  Email: {professional.email}
                </p>
                <p className="text-sm text-gray-400">
                  Empresa ID: {professional.companyId}
                </p>
                <hr className="w-3/4 border-gray-600 my-4" />
                <div className="text-xs text-gray-400 text-center">
                  <p>Criado em: {new Date(professional.createdAt).toLocaleDateString()}</p>
                  <p>Atualizado em: {new Date(professional.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold shadow-sm hover:shadow-md transition hover:bg-gray-300">
                Saiba Mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Professionals;
