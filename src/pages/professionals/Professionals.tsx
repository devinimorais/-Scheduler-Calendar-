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
                className="relative bg-[#f8f9fa] text-gray-900 rounded-lg"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-black to-gray-500 text-white px-4 py-2 rounded-bl-xl shadow-lg">
                  <p className="text-sm font-bold">ID: {professional.id}</p>
                </div>

                <div className="h-2 bg-black rounded-t-lg"></div>
                <div className="p-4 space-y-4">
                  <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-wide text-left">
                    {professional.name}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium border-t border-black pt-3">
                    Profissão: {professional.profession}
                  </p>
                </div>

                <div className="p-4">
                  <button
                    className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all"
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum profissional disponível para este serviço.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Professionals;
