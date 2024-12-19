import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbCalendarClock } from "react-icons/tb";
import { Appointment } from './../../api/appointments';
import { newDate } from "react-datepicker/dist/date_utils";


type Professional = {
  id: number;
  name: string;
  profession: string;
  appointmentSpacing: string;
  schedules: {
    startTime: string;
    endTime: string;
    weekday: string;
    weekdayEn: string;
  }[];
};



const Professionals = () => {
  const location = useLocation();
  const { professionals, serviceName }: { professionals: Professional[]; serviceName: string } =
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

  }, [serviceName]);

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
    if (!professional.schedules || !professional.schedules.length) {
      setAvailableTimeSlots([]);
      return;
    }
    const dayOfWeekIndex = new Date(date).getDay();
    const weekdayEnMap = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const selectedWeekdayEn = weekdayEnMap[dayOfWeekIndex];
    const schedule = professional.schedules.find(
      (s) => s.weekdayEn.toLowerCase() === selectedWeekdayEn
    );

    if (!schedule) {
      setAvailableTimeSlots([]);
      return;
    }
    const { startTime, endTime } = schedule;
    const duration = parseInt(professional.appointmentSpacing, 10) || 30;
    const correctedEndTime = endTime === "00:00" ? "23:59" : endTime;

    const start = new Date(
      `${date}T${startTime}:00`
    );

    const end = new Date(
      `${date}T${correctedEndTime}:00`
    );

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
          scheduledDate: createDate(selectedDate,selectedTimeSlot),
          description: `Agendamento com ${selectedProfessional.name}`,
          status: "pending",
          userId: selectedProfessional.id,
          ticketId: +ticketId,
        },

      });

      console.log(selectedDate ,"AAAAAAAA", selectedTimeSlot, "AQUIIIIIIIIIII")


      toast.success("Agendamento criado com sucesso!");
      closeModal();
    } catch (err: any) {
      if (err.response) {
        toast.error(`Erro: ${err.response.data.message || JSON.stringify(err.response.data)}`);
      } else {
        toast.error("Falha ao criar agendamento. Verifique sua conexão.");
      }
    }
  };
  console.log(selectedProfessional);
  const closeModal = () => {
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
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
      }
    }
  };



  const filteredProfessionals = professionals.filter((professional) =>
    professional.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function isTimeSchaduled(timeString: Date) {
    const time = new Date(timeString)
    console.log(time, "aaaaaaaaaaaaaaaaaaaaaaa", appointments)
    const result = appointments.map(date => date.scheduledDate
    ).filter((date) => new Date(date).getTime() === time.getTime()).length > 0;
    console.log(result)

    return result

  }




  return (

    <div className="relative  min-h-screen ">
      <div className="p-6 lg:p-8 mt-16 relative">
        <div className="flex justify-end mb-6" ref={searchRef}>
          <div
            className={`relative ${searchOpen ? "w-[270px]" : "w-[60px]"
              } h-[40px] bg-black shadow-lg rounded-lg flex items-center transition-all duration-300 border border-solid border-black`}
            onClick={() => setSearchOpen(true)}
          >

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

            {searchOpen && (
              <input
                type="text"
                placeholder="Pesquisar profissionais"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none text-[16px] bg-transparent w-full text-white font-normal px-4 transition-all duration-300 placeholder-white"
                autoFocus
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <div
                key={professional.id}
                className="flex flex-col bg-white mx-auto w-full sm:w-[85%] shadow-custom-card border border-solid border-black rounded-lg"
              >
                <div className="px-4 py-6 sm:p-8 sm:pb-4">

                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-14 h-14 text-white bg-black rounded-full">
                        {professional.name
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight text-black lg:text-2xl">
                          {professional.name}
                        </h2>
                        <p className="text-lg text-gray-500">
                          Profissão: {professional.profession}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 text-right">
                      <p>
                        <span className="text-3xl font-light tracking-tight text-green-700">
                          {professional.appointmentSpacing} min
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex px-4 pb-6 sm:px-6">
                  <button
                    onClick={() => setSelectedProfessional(professional)}
                    className="flex items-center justify-center w-full px-4 py-2 text-center text-white duration-200 bg-black border-2 border-black rounded-lg hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    Reservar horário
                    <TbCalendarClock className="ml-2 text-base" />
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
                  <div className="flex justify-between items-center px-4 py-3">
                    <button
                      className="px-3 py-2 bg-black text-white rounded-full hover:bg-customColorGray"
                      onClick={handlePreviousMonth}
                    >
                      {"<"}
                    </button>
                    <h3 className="text-lg font-medium uppercase">
                      {new Date(currentYear, currentMonth).toLocaleDateString("pt-BR", {
                        month: "long",
                        year: "numeric",
                      }).replace(/(^\w)/, (match) => match.toUpperCase())}
                    </h3>
                    <button
                      className="px-3 py-2 bg-black text-white rounded-full hover:bg-customColorGray"
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
                    const days = [];
                    for (let i = 0; i < firstDayOfMonth; i++) {
                      days.push(<div key={`empty-${i}`} className="h-10"></div>);
                    }
                    for (let day = 1; day <= daysInMonth; day++) {
                      days.push(
                        <button
                          key={day}
                          onClick={() => handleDateSelection(day)}
                          className={`h-10 rounded-lg text-black ${selectedDate ===
                            `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                            ? "bg-customColorGray text-white"
                            : "bg-gray-100 hover:bg-gray-300"
                            }`}
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
                      <p className="text-sm text-white text-center bg-customColorGray p-2">
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
                            : selectedTimeSlot === slot
                              .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                              .replace(":", "H")
                              .concat("min")
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
