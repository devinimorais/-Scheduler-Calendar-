import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbCalendarClock } from "react-icons/tb"; // Certifique-se de importar o ícone

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

type Service = {
  id: number;
  name: string;
  description: string;
  duration: number;
};

const Professionals = () => {
  const location = useLocation();
  const { professionals, serviceName }: { professionals: Professional[]; serviceName: string } =
    location.state || { professionals: [], serviceName: "" };

  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  useEffect(() => {
    if (serviceName) {
      toast.info(`Serviço selecionado: ${serviceName}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "text-sm font-medium bg-black text-white rounded-md",
      });
    }
  }, [serviceName]);

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
    const weekdayEnMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
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
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${correctedEndTime}:00`);

    if (start >= end) {
      setAvailableTimeSlots([]);
      return;
    }

    const slots: string[] = [];
    let current = new Date(start);
    while (current < end) {
      slots.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + duration);
    }

    setAvailableTimeSlots(slots);
  };

  const createAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedProfessional) {
      toast.error("Por favor, selecione uma data, horário e profissional.");
      return;
    }

    try {
      await axios.post("https://api.tzsexpertacademy.com/bypass/", {
        url: "https://api.tzsexpertacademy.com/appointments",
        method: "POST",
        body: {
          scheduledDate: new Date(`${selectedDate}T${selectedTimeSlot}:00Z`).toISOString(),
          description: `Agendamento com ${selectedProfessional.name}`,
          status: "pending",
          userId: 3,
          ticketId: 12,
        },
      });

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

  const closeModal = () => {
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
  };

  const handleConfirm = () => {
    createAppointment();
  };

  useEffect(() => {
    if (selectedProfessional && selectedDate) {
      generateTimeSlots(selectedProfessional, selectedDate);
    }
  }, [selectedProfessional, selectedDate]);

  const isConfirmButtonDisabled = !selectedDate || !selectedTimeSlot;

  return (
    <div className="relative">
      <Navbar />
      <div className="p-6 lg:p-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {professionals.length > 0 ? (
            professionals.map((professional) => (
              <div
                key={professional.id}
                className="flex flex-col bg-white rounded-3xl mx-auto w-[90%] sm:w-[80%] shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                      <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                        {professional.name}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500">
                        Profissão: {professional.profession}
                      </p>
                    </div>
                    <div className="mt-6 text-right">
                      <p>
                        <span className="text-3xl font-light tracking-tight text-green-700">
                           {professional.appointmentSpacing} min
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex px-6 pb-8 sm:px-8">
                  <button
                    onClick={() => setSelectedProfessional(professional)}
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    Reservar horário
                    <TbCalendarClock className="ml-2 text-lg" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-4xl w-full p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-4">
              Selecione a Data e o Horário para {selectedProfessional.name}
            </h2>
            <div className="flex flex-row gap-8">
              <div className="w-2/3">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    onClick={handlePreviousMonth}
                  >
                    {"<"}
                  </button>
                  <h3 className="text-xl font-semibold">
                    {new Date(currentYear, currentMonth).toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    onClick={handleNextMonth}
                  >
                    {">"}
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-4 mb-2 text-center font-bold">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
                    <div key={index} className="text-gray-700">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {(() => {
                    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
                    const days = [];
                    for (let i = 0; i < firstDayOfMonth; i++) {
                      days.push(<div key={`empty-${i}`} className="w-full h-10"></div>);
                    }
                    for (let day = 1; day <= daysInMonth; day++) {
                      days.push(
                        <button
                          key={day}
                          onClick={() => handleDateSelection(day)}
                          className={`w-full h-10 rounded-full ${selectedDate ===
                            `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 text-gray-700"
                            } hover:bg-purple-200`}
                        >
                          {day}
                        </button>
                      );
                    }
                    return days;
                  })()}
                </div>
              </div>
              <div className="w-1/3 bg-gray-100 p-6 rounded-lg overflow-y-auto max-h-64">
                <h3 className="text-xl font-bold mb-4">Horários Disponíveis</h3>
                {availableTimeSlots.length > 0 ? (
                  <ul className="space-y-2">
                    {availableTimeSlots.map((slot, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-2 rounded-md cursor-pointer ${selectedTimeSlot === slot
                          ? "bg-green-500 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                      >
                        {slot}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Nenhum horário disponível</p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isConfirmButtonDisabled}
                className={`px-4 py-2 rounded-md text-white ${isConfirmButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Professionals;
