import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"; // Ajuste o caminho para o componente Navbar, se necessário

type Service = {
  id: number;
  name: string;
  duration: string; // Duração em minutos, mas exibiremos com "min"
  price: string; // Valor em reais
  description: string;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3001/services");
        if (!response.ok) {
          throw new Error("Erro ao carregar os serviços");
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-snug">
          <span className="block">
            <span className="text-gray-700">Descubra</span>{" "}
            <span className="text-black underline decoration-teal-500 decoration-4">
              O Melhor Serviço
            </span>
          </span>
        </h1>
        <p className="text-center text-lg text-gray-600 italic mb-6">
          Seu momento começa aqui. Reserve agora e transforme seu dia.
        </p>

        <div className="flex justify-end items-center mb-8">
          <div className="relative w-full lg:w-1/5">
            <input
              type="text"
              placeholder="Procurar..."
              className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-black text-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-gray-500 transition duration-300"
            >
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-2 text-center uppercase tracking-wide">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  Duração: {service.duration} min
                </p>
                <p className="text-lg font-bold text-gray-100 mb-4">
                  R$ {service.price}
                </p>
                <hr className="w-3/4 border-gray-600 mb-4" />
                <p className="text-sm text-gray-300 text-center">
                  {service.description}
                </p>
              </div>
              <button className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold shadow-sm hover:shadow-md transition hover:bg-gray-300">
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
