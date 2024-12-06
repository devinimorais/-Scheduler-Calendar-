import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PiInfoDuotone } from "react-icons/pi";
import { PiClockCounterClockwiseDuotone } from "react-icons/pi";
import Home from "../home/Home";

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

const Services = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      if (!serviceId) {
        toast.error("ID do serviço não fornecido.");
        return;
      }

      try {
        const { data } = await axios.post("https://api.tzsexpertacademy.com/bypass/", {
          url: `https://api.tzsexpertacademy.com/service/${serviceId}`,
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
  }, [serviceId]);

  const handleSelectService = (service: Service) => {
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
        {/* <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="Procurar serviços..."
            className="border p-2 rounded-md w-full lg:w-1/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((service) => (
              <div
                key={service.id}
                className="relative bg-[#f8f9fa] text-gray-900 rounded-lg mx-auto w-[90%] sm:w-[70%]"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
              >
                <div className="absolute right-0 bg-gradient-to-r from-black to-gray-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-bold text-green-300">R$ {parseInt(service.price)}</p>
                </div>

                <div className="h-2 bg-black rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-wide text-left border-b border-gray-300 pb-2">
                    {service.name}
                  </h3>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-3">
                      <PiClockCounterClockwiseDuotone className="text-black text-3xl" />
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {service.duration} minutos
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PiInfoDuotone className="text-black text-3xl" />
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {service.description.charAt(0).toUpperCase() + service.description.slice(1)}
                      </p>
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
