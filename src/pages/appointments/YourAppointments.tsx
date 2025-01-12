import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdCancel } from "react-icons/md"; 


type Appointment = {
  id: number;
  scheduledDate: string;
  status: string;
  service: {
    name: string;
  };
  user: {
    name: string;
  };
};

const YourAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!ticketId || !companyId) {
        toast.error("Ticket ID ou ID da companhia não fornecido.");
        navigate("/nao-encontrado");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://api.tzsexpertacademy.com/bypass/",
          {
            url: `https://api.tzsexpertacademy.com/appointments/ticket/${ticketId}?companyId=${companyId}`,
            method: "GET",
          }
        );
        setAppointments(data.data);
      } catch (err) {
        toast.error("Erro ao carregar os agendamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [ticketId, companyId, navigate]);

  const cancelAppointment = async (appointmentId: number) => {
    try {
      await axios.post("https://api.tzsexpertacademy.com/bypass/", {
        url: `https://api.tzsexpertacademy.com/appointments/${appointmentId}`,
        method: "PATCH",
        body: {
          ticketId: +ticketId!,
        },
      });

      toast.success("Agendamento cancelado com sucesso.");
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );
    } catch (err) {
      toast.error("Erro ao cancelar o agendamento.");
    }
  };

  const getStatusStyles = (status: string) => {
    if (status === "pending") {
      return "bg-green-200 text-green-800";
    } else if (status === "cancelled") {
      return "bg-red-200 text-red-800";
    }
    return "bg-gray-200 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    if (status === "pending") return "Agendado";
    if (status === "cancelled") return "Cancelado";
    return status;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ToastContainer />
      <div className="p-6 lg:p-8 relative">
        <div className="bg-white shadow-custom-card border border-solid border-black rounded-lg relative p-4">
          <div className="flex items-center flex-col w-full">
            <div className="flex w-full flex-col items-start">
              <h1 className="text-3xl sm:text-4xl font-bold text-black">Seus agendamentos</h1>
              <span className="text-sm sm:text-lg font-normal text-gray-900">
                Confira os seus agendamentos
              </span>
            </div>
            <div className="h-2 border border-solid w-full border-l-0 border-r-0 border-b-0 border-gray-200 mt-4" />
            <div className="w-full flex justify-center items-center flex-wrap gap-4 ">
              <ul className="flex gap-2 sm:gap-4 flex-wrap">
                <li
                  className={` border-solid border-t-0 border-r-0 border-l-0 cursor-pointer ${
                    location.pathname.includes("/services") ? "underline font-bold" : ""
                  }`}
                >
                  <Link to={`/services/${companyId}?ticketId=${ticketId}`} className="text-black ">
                    Serviços
                  </Link>
                </li>
                <li
                  className={`cursor-not-allowed ${
                    location.pathname.includes("/professionals") ? "underline font-bold" : ""
                  }`}
                >
                  <span>Profissionais</span>
                </li>
                <li
                  className={`border-2 cursor-pointer ${
                    location.pathname.includes("/your-appointments") ? "underline font-bold" : ""
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
                  placeholder="Pesquisar agendamentos"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {appointments
            .filter((appointment) =>
              appointment?.service?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((appointment) => (
              <div
                key={appointment?.id}
                className="flex flex-col bg-white h-auto w-full sm:w-[90%] shadow-custom-card border border-solid border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-center w-24 h-24 text-white bg-black rounded-full mx-auto mb-4 text-2xl">
                  {appointment?.service?.name
                    ?.split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="flex flex-col items-center text-center mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black">
                    {appointment?.service?.name}
                  </h2>
                  <p className="text-sm sm:text-lg text-gray-500">
                    Profissional: {appointment?.user?.name}
                  </p>
                  <p className="text-sm sm:text-lg text-gray-500">
                    Data: {new Date(appointment?.scheduledDate).toLocaleString()}
                  </p>
                  <p
                    className={`text-sm sm:text-lg font-medium px-4 py-1 rounded-full mt-2 ${getStatusStyles(
                      appointment?.status
                    )}`}
                  >
                    {getStatusLabel(appointment?.status)}
                  </p>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => cancelAppointment(appointment?.id)}
                    disabled={appointment?.status === "cancelled"}
                    className={`flex items-center justify-center w-full px-4 py-2 text-white font-medium text-sm sm:text-base rounded-md transition duration-200 ${
                      appointment?.status === "cancelled"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Cancelar
                    <MdCancel className="ml-2 text-base" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default YourAppointments;
