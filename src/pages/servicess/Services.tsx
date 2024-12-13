import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TbArrowBigRightLine } from "react-icons/tb";
import errorImage from '../../assets/img/error-404.jpg';
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
  const [searchTerm, setSearchTerm] = useState<string>(""); // Controla o texto digitado
  const [searchOpen, setSearchOpen] = useState<boolean>(false); // Controla se o campo de busca está aberto
  const [loading, setLoading] = useState<boolean>(true);
  const searchRef = useRef<HTMLDivElement>(null); // Referência ao contêiner do search
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

  // Fecha o campo de busca ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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


  if (!ticketId?.trim()) {
    return (
      <div className="relative min-h-screen">

        <div className="absolute left-0 right-0 text-center text-red-700 font-bold"
          style={{
            top: "2%",
          }}>
          <div className="p-6  max-w-lg mx-auto">
            <span className="text-4xl mr-2">⚠️</span>
            <p className="text-lg md:text-2xl">
              <strong>Link informado não é válido.</strong><br />
              Por favor, entre contato com suporte.
            </p>
          </div>
        </div>

        <div
          className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${errorImage})`, // Substitua pelo caminho da sua imagem
            backgroundSize: "40%", // Mantém a proporção da imagem
          }}
        />
      </div>
    );
  }



  return (
    <div className="relative  min-h-screen">
      <ToastContainer />
      <div className="p-6 lg:p-8 mt-16 relative">
        {/* Campo de busca */}
        <div className="flex justify-end mb-6" ref={searchRef}>
          <div
            className={`relative ${searchOpen ? "w-[270px]" : "w-[60px]"
              } h-[40px] bg-black shadow-lg rounded-lg flex items-center transition-all duration-300 border border-solid border-black`}
            onClick={() => setSearchOpen(true)} // Abre o campo ao clicar
          >

            {/* Ícone de busca */}
            <div className="flex items-center justify-center fill-white pl-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                className="group-hover:fill-blue-200 transition duration-300"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </div>
            {/* Input de busca */}
            {searchOpen && (
              <input
                type="text"
                placeholder="Pesquisar serviços"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none text-[16px] bg-transparent w-full text-white font-normal px-4 transition-all duration-300 placeholder-white"
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Lista de serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) =>
              service.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((service) => (
              <div
                key={service.id}
                className="flex flex-col bg-white mx-auto w-full sm:w-[85%] shadow-custom-card border border-solid border-black rounded-lg"
              >
                {/* ID do serviço no topo do card */}


                <div className="px-4 py-6 sm:p-8 sm:pb-4">
                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div className="flex items-center space-x-4">
                      {/* Círculo com as iniciais do serviço */}
                      <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full">
                        {service.name
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      {/* Nome e descrição do serviço */}
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight text-black lg:text-2xl">
                          {service.name}
                        </h2>
                        <p className="text-lg text-gray-500">
                          {service.description.charAt(0).toUpperCase() +
                            service.description.slice(1)}
                        </p>
                      </div>
                    </div>
                    {/* Preço e duração */}
                    <div className="mt-1 text-right">
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
