import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importação do hook de navegação
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type Professional = {
  id: number;
  name: string;
};

type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  users: Professional[];
};

type TimeSlot = {
  time: string;
  available: boolean;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Hook de navegação do React Router

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.post("https://api.tzsexpertacademy.com/bypass/", {
          url: "https://api.tzsexpertacademy.com/service/16",
          method: "GET",
        });
        setServices(data.data);
      } catch (err) {
        toast.error("Erro ao carregar serviços.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSelectService = (service: Service) => {
    // Redireciona o usuário para a página de profissionais e passa os dados do serviço selecionado
    navigate("/professionals", { state: { professionals: service.users, serviceName: service.name } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />
      <ToastContainer />
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          Descubra o Melhor Serviço
        </h1>
        <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="Procurar serviços..."
            className="border p-2 rounded-md w-full lg:w-1/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((service) => (
              <div
                key={service.id}
                className="relative bg-[#f8f9fa] text-gray-900 rounded-lg"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-black to-gray-500 text-white px-4 py-2 rounded-bl-xl shadow-lg">
                  <p className="text-sm font-bold">R$ {service.price}</p>
                </div>

                <div className="h-2 bg-black rounded-t-lg"></div>
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-wide text-left">
                    {service.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium border-t border-black pt-3"></p>
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-gray-900 font-semibold text-lg">
                        Descrição: {service.description.charAt(0).toUpperCase() + service.description.slice(1)}
                      </p>
                      <p className="text-gray-900 font-semibold text-lg">Duração: {service.duration} min</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <button
                    onClick={() => handleSelectService(service)}
                    className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all"
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
