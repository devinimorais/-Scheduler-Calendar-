import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TbArrowBigRightLine } from "react-icons/tb";


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
    <div className="relative bg-customGray min-h-screen">
      <Navbar />
      <ToastContainer />
      <div className="p-6 lg:p-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) =>
              service.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((service) => (
              <div
                key={service.id}
                className="flex flex-col bg-white rounded-xl mx-auto w-full sm:w-[85%] shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-4 py-6 sm:p-8 sm:pb-4">
                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                      <h2 className="text-md font-semibold tracking-tight text-black lg:text-2xl">
                        {service.name}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {service.description.charAt(0).toUpperCase() +
                          service.description.slice(1)}
                      </p>
                    </div>
                    <div className="mt-4 text-right">
                      <p>
                        <span className="text-3xl font-light tracking-tight text-green-700">
                          R$ {parseInt(service.price)}
                        </span>
                        <span className="text-sm font-medium text-black">
                          {" "}
                          / {service.duration} min
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex px-4 pb-6 sm:px-6">
                  <button
                    onClick={() => handleSelectService(service)}
                    className="flex items-center justify-center w-full px-4 py-2 text-center text-white duration-200 bg-black border-2 border-black rounded-lg hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    Selecionar
                    <TbArrowBigRightLine className="ml-2 text-base" />
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
