import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbCalendarClock } from "react-icons/tb";
import { IoLogoSkype } from "react-icons/io";
import Services from './../servicess/Services';



type Professional = {
  id: number;
  name: string;
  profession: string;
  appointmentSpacing: string;
  appointmentSpacingUnit: string,
  schedules: {
    startTime: string;
    endTime: string;
    weekday: string;
    weekdayEn: string;
  }[];
};

type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  users: Professional[];
};

const service: Service = {
  id: 1,
  name: "Serviço Exemplo",
  description: "Descrição do serviço",
  price: "100",
  duration: "60",
  users: [],
};

const Professionals = () => {
  const location = useLocation();
  const { professionals, serviceName, serviceId, companyId }: { professionals: Professional[], serviceName: string, serviceId: any,companyId: any } =
    location.state || { professionals: [], serviceName: "" };

  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const isConfirmButtonDisabled = !selectedDate || !selectedTimeSlot || !selectedProfessional;
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const [reload, setReload] = useState(0);
  useEffect(() => {
    if (serviceName) {
      toast.info(
        <div className="text-left">
          <span className="block">Serviço selecionado:</span>
          <span className="block text-black font-bold">{serviceName}</span>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "text-sm font-medium bg-black text-white rounded-md w-full lg:max-w-sm",
          progressStyle: { backgroundColor: "black" },
          icon: <TbCalendarClock className="text-black" />,
        }
      );
      fetchAppointments();
    }

  }, [serviceName, reload]);


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


  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };



  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDateSelection = (day: number) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(date);
    if (selectedProfessional) {
      generateTimeSlots(selectedProfessional, date);
    }
  };

  const generateTimeSlots = (professional: Professional, date: string) => {
    if (!professional?.schedules || !professional?.schedules.length) {
      setAvailableTimeSlots([]);
      return;
    }

    const dayOfWeekIndex = new Date(date).getDay();
    const weekdayEnMap = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const selectedWeekdayEn = weekdayEnMap[dayOfWeekIndex];
    const schedule = professional?.schedules.find(
      (s) => s.weekdayEn.toLowerCase() === selectedWeekdayEn
    );

    if (!schedule) {
      setAvailableTimeSlots([]);
      return;
    }

    const { startTime, endTime } = schedule;
    const duration = professional?.appointmentSpacingUnit.toLowerCase() === "hours"
      ? parseInt(professional?.appointmentSpacing, 10) * 60
      : parseInt(professional?.appointmentSpacing, 10);

    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(`${date}T${endTime === "00:00" ? "23:59" : endTime}:00`);

    if (start >= end) {
      setAvailableTimeSlots([]);
      return;
    }

    const slots = [];
    let current = new Date(start);

    while (current < end) {
      slots.push(new Date(current));
      current.setMinutes(current.getMinutes() + duration);
    }

    setAvailableTimeSlots(slots);
  };




  const createAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedProfessional || !ticketId) {

      toast.error("Por favor, selecione uma data, horário e profissional.");

      return;
    }

    function createDate(A: string, B: string) {
      const [year, month, day] = A.split('-').map(Number);
      const [hours, minutes] = B.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    }
    try {
      await axios.post("https://api.tzsexpertacademy.com/bypass/", {
        url: "https://api.tzsexpertacademy.com/appointments",
        method: "POST",
        body: {

          scheduledDate: createDate(selectedDate, selectedTimeSlot),
          description: `Agendamento com ${selectedProfessional.name}`,
          status: "pending",
          userId: selectedProfessional.id,
          ticketId: +ticketId,
          serviceId
        },
      });

      toast.success("Agendamento criado com sucesso!");
      setReload(reload + 1)
      closeModal();
    } catch (err: any) {
      if (err.response) {
        toast.error(`Erro: ${err.response.data.message || JSON.stringify(err.response.data)}`);
      } else {
        toast.error("Falha ao criar agendamento. Verifique sua conexão.");
      }
    }
  };
  const closeModal = () => {
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setAvailableTimeSlots([])
  };

  const handleConfirm = () => {
    createAppointment();
  };


  const fetchAppointments = async () => {
    try {
      const response = await axios.post("https://api.tzsexpertacademy.com/bypass/", {
        url: "https://api.tzsexpertacademy.com/appointments",
        method: "GET",
      });
      setAppointments(response.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao buscar os agendamentos:', err.message);
        setError(err.message);
      } else {
        toast.error("Falha buscar agendamento");
      }
    }
  };

  const handleSelectService = () => {
    navigate(`/services/${companyId}?ticketId=${ticketId}`,);
  };

  const unitTranslations: { [key: string]: string } = {
    hours: "hora(s)",
    minutes: "minutos",
  };

  const filteredProfessionals = professionals.filter((professional) =>
    professional?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function isTimeSchaduled(timeSlot: Date) {
    if (!selectedProfessional) return false;


    const professionalAppointments = appointments.filter(
      (appointment) => appointment.userId === selectedProfessional.id
    );

    return professionalAppointments.some((appointment) => {
      const scheduledDate = new Date(appointment.scheduledDate);
      return scheduledDate.getTime() === timeSlot.getTime();
    });
  }



  return (

    <div className="relative  min-h-screen w-full ">

      <div className="p-6 lg:p-8 relative w-full ">
        <div className=" bg-white  shadow-custom-card border border-solid border-black rounded-lg relative p-4">
          <div className="flex items-center  flex-col  w-full">
            <div className="  flex w-full justify-between">
              <div className="  flex w-full flex-start flex-col">
                <h1 className="text-3xl font-bold text-black">{serviceName}</h1>
                <span className="text-lg font-normal text-gray-900">Serviço Selecionado</span>
              </div>
              <div className="w-[80px] h-[80px] overflow-hidden p-1 flex justify-center items-center">
                <img width={300} />
              </div>
            </div>
            <div className="h-2 border border-solid w-full border-l-0 border-r-0 border-b-0 border-gray-200" />

            <div className="w-full flex justify-between items-center flex-wrap flex-col sm:flex-row gap-2 sm:gap-2">
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



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 ">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <div
                key={professional?.id}
                className="flex flex-col bg-white h-[350px] w-full sm:w-[90%] shadow-custom-card border border-solid border-gray-200 rounded-lg sm:h-[380px]"
              >
                <div className="px-4 py-6 sm:p-8 sm:pb-4 flex-grow">
                  <div className="grid items-center justify-center place-items-center w-full text-left">
                    <div className="flex items-center justify-center w-24 h-24 text-white bg-black rounded-full mb-4 text-2xl">
                      {professional?.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="flex items-center justify-center mb-4 w-full">
                      <div className="flex flex-col justify-center">
                        <h2 className="text-lg font-semibold tracking-tight text-black lg:text-2xl text-center">
                          {professional?.name}
                        </h2>
                        <p className="text-lg text-gray-500 text-center">
                          {professional?.profession}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p>
                        <span className="text-3xl font-light tracking-tight text-green-700">
                          {professional?.appointmentSpacing}{" "}
                          {unitTranslations[professional?.appointmentSpacingUnit] || professional?.appointmentSpacingUnit}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex px-4 pb-6 sm:px-6 mt-auto">
                  <button
                    onClick={() => setSelectedProfessional(professional)}
                    className="flex items-center justify-center w-full px-4 py-2 text-center text-white bg-black border-2 border-black rounded-lg hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    Reservar horário
                    <TbCalendarClock className="text-base flex-shrink-0" />
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

      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg  max-w-4xl w-full p-6 lg:p-8 flex flex-col space-y-6 shadow-custom-card">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3 ">
                <div className="bg-black text-white rounded-t-lg">
                  <div className="relative flex items-center px-4 py-3">
                    <h3 className="text-lg font-medium uppercase mx-auto">
                      {new Date(currentYear, currentMonth).toLocaleDateString("pt-BR", {
                        month: "long",
                        year: "numeric",
                      }).replace(/(^\w)/, (match) => match.toUpperCase())}
                    </h3>
                    <button
                      className="absolute right-4 px-3 py-2 bg-black text-white rounded-full hover:bg-customColorGray"
                      onClick={handleNextMonth}
                    >
                      {">"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-xs font-medium text-center bg-customColorGray text-white py-2 rounded-b-lg ">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
                    <div key={index} className="uppercase">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {(() => {
                    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
                    const today = new Date(); // Data atual
                    const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

                    const days = [];
                    for (let i = 0; i < firstDayOfMonth; i++) {
                      days.push(<div key={`empty-${i}`} className="h-10"></div>);
                    }
                    for (let day = 1; day <= daysInMonth; day++) {
                      const isPastDay =
                        isCurrentMonth && day < today.getDate();

                      days.push(
                        <button
                          key={day}
                          onClick={() => !isPastDay && handleDateSelection(day)}
                          className={`h-10 rounded-lg text-black ${selectedDate ===
                            `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                            ? "bg-customColorGray text-white"
                            : isPastDay
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 hover:bg-gray-300"
                            }`}
                          disabled={isPastDay}
                        >
                          {day}
                        </button>
                      );
                    }
                    return days;
                  })()}
                </div>

              </div>
              <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-inner flex flex-col justify-between">
                <div className="mb-4">
                  <div className="rounded-md overflow-hidden">
                    <h3 className="text-lg font-bold text-white text-center bg-black p-3">
                      Horários Disponíveis
                    </h3>
                    {selectedProfessional && (
                      <p className="text-sm text-white text-center bg-customColorGray p-2 mb-3">
                        <span className="font-normal">{serviceName}</span> |{" "}
                        <span className="font-normal">{selectedProfessional.name}</span>
                      </p>
                    )}
                  </div>
                  {availableTimeSlots.length > 0 ? (
                    <ul className="space-y-2 overflow-y-auto max-h-40 lg:max-h-64 pr-2">
                      {availableTimeSlots.map((slot, index) => (
                        <li
                          key={index}
                          onClick={() => !isTimeSchaduled(slot) && setSelectedTimeSlot(slot.toTimeString().slice(0, 5))}
                          className={`p-2 text-sm text-center rounded-lg ${isTimeSchaduled(slot)
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed hover:cursor-not-allowed"
                            : selectedTimeSlot === slot.toTimeString().slice(0, 5)

                              ? "bg-customColorGray text-white"
                              : "bg-green-200 text-black hover:bg-gray-300 cursor-pointer"
                            }`}
                          style={{ cursor: isTimeSchaduled(slot) ? "not-allowed" : "pointer" }}
                          title={isTimeSchaduled(slot) ? "Unavailable" : "Select time"}
                        >
                          {isTimeSchaduled(slot) ? (
                            <input
                              type="text"
                              value={slot
                                .toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                                .replace(":", "H")
                                .concat("min")}
                              disabled
                              className="bg-transparent text-center line-through text-red-400 border-none pointer-events-none"
                              style={{ cursor: "not-allowed" }}
                            />
                          ) : (
                            slot
                              .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                              .replace(":", "H")
                              .concat("min")
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-yellow-700 font-semibold text-center p-2 rounded-md mt-6">
                      Por favor, selecione uma data para visualizar os horários disponíveis.
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isConfirmButtonDisabled}
                    className={`px-4 py-2 text-sm rounded-md text-white ${isConfirmButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-customColorGray"
                      }`}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Professionals;
