import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TbArrowBigRightLine } from "react-icons/tb";
import errorImage from '../../assets/img/error-404.jpg';
import Professionals from "../professionals/Professionals";
import { Link } from "react-router-dom";

type Professional = {
  id: number;
  name: string;
  appointmentSpacingUnit: string,
};

type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  users: Professional[];

};

const Services: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Controla o texto digitado
  const [searchOpen, setSearchOpen] = useState<boolean>(false); // Controla se o campo de busca está aberto
  const [loading, setLoading] = useState<boolean>(true);
  const searchRef = useRef<HTMLDivElement>(null); // Referência ao contêiner do search
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');

  useEffect(() => {
    const fetchServices = async () => {
      if (!companyId) {
        toast.error("ID do serviço não fornecido.");
        return;
      }

      try {
        const { data } = await axios.post("https://api.tzsexpertacademy.com/bypass/", {
          url: `https://api.tzsexpertacademy.com/services/company/${companyId}`,
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
  }, [companyId]);

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
    navigate(`/professionals?ticketId=${ticketId}`, {
      state: { professionals: service.users, serviceName: service.name, companyId, serviceId: service.id }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );
  }


  if (!ticketId?.trim()) {
    navigate('/nao-encontrado')
  }



  return (
    <div className="relative  min-h-screen">
      <ToastContainer />
      <div className="p-6 lg:p-8  relative">
        {/* Campo de busca */}

        <div className=" bg-white  shadow-custom-card border border-solid border-black rounded-lg relative p-4">
          <div className="flex items-center  flex-col  w-full">
            <div className="  flex w-full flex-start flex-col">
              <h1 className="text-3xl font-bold text-black">Escolha um serviço</h1>
              <span className="text-lg font-normal text-gray-900">Bem-vindo!</span>

            </div>
            <div className="h-2 border border-solid w-full border-l-0 border-r-0 border-b-0 border-gray-200" />

            <div className="w-full flex justify-between items-center flex-wrap flex-col sm:flex-row gap-2 sm:gap-2">
              <ul className="flex gap-2 sm:gap-4 flex-wrap">
                <li
                  className={` border-solid border-t-0 border-r-0 border-l-0 cursor-pointer ${location.pathname.includes("/services") ? "underline font-bold" : ""
                    }`}
                >
                  <Link to={`/services/${companyId}?ticketId=${ticketId}`} className="text-black ">
                    Serviços
                  </Link>
                </li>
                <li
                  className={`cursor-not-allowed ${location.pathname.includes("/professionals") ? "underline font-bold" : ""
                    }`}
                >
                  <span>Profissionais</span>
                </li>
                <li
                  className={`border-2 cursor-pointer ${location.pathname.includes("/your-appointments") ? "underline font-bold" : ""
                    }`}
                >
                  <Link to={`/your-appointments/${companyId}?ticketId=${ticketId}`} className="text-black">
                    Agendamentos
                  </Link>
                </li>
              </ul>
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Pesquisar serviços"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

        </div>



        {/* Lista de serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services
            .filter((service) =>
              service.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((service) => (
              <>

                <div
                  key={service?.id}
                  className="flex flex-col bg-white h-[410px] w-full sm:w-[90%] shadow-custom-card border border-solid border-gray-200 rounded-lg"
                >
                  <div className="px-4 py-6 sm:p-8 sm:pb-4 flex-grow">
                    <div className="grid items-center justify-center place-items-center w-full text-left">
                      <div className="flex items-center justify-center w-24 h-24 text-white bg-black rounded-full mb-4 text-2xl">
                        {service.name
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="flex items-center justify-center mb-4 w-full">
                        <div className="flex flex-col justify-center text-center">
                          <h2 className="text-lg font-semibold tracking-tight text-black lg:text-2xl text-center">
                            {service?.name}
                          </h2>
                          <p className="text-lg text-gray-500">
                            {service?.description.charAt(0).toUpperCase() +
                              service?.description.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p>
                          <span className="text-3xl font-light tracking-tight text-green-700">
                            R$ {parseInt(service?.price)}
                          </span>
                          <span className="text-sm font-medium text-black">
                            {" "}
                            / {service?.duration} min
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
              </>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
