import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

type Professional = {
  id: number;
  name: string;
  profession: string;
};

type Service = {
  id: number;
  name: string;
  description: string;
};

const Professionals = () => {
  const location = useLocation();
  const { professionals, serviceName }: { professionals: Professional[]; serviceName: string } =
    location.state || { professionals: [], serviceName: "" };

  return (
    <div className="relative">
      <Navbar />
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          Profissionais para o Serviço: <span className="text-teal-500">{serviceName}</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {professionals.length > 0 ? (
            professionals.map((professional) => (
              <div
                key={professional.id}
                className="bg-white text-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center"
              >
                <h2 className="text-xl font-semibold mb-2 text-center">{professional.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{professional.profession}</p>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                  Ver Mais
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum profissional disponível para este serviço.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Professionals;
