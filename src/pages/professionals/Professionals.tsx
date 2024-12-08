import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Professional = {
  id: number;
  name: string;
  profession: string;
  appointmentSpacing: string; // Ex.: "30"
  schedules: {
    startTime: string; // Ex.: "08:00"
    endTime: string; // Ex.: "22:22"
    weekday: string; // Ex.: "Segunda-feira"
    weekdayEn: string; // Ex.: "monday"
  }[];
};

type Service = {
  id: number;
  name: string;
  description: string;
  duration: number; // Duração em minutos
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
  
    // Obter o índice do dia da semana no JavaScript (0 = domingo, 1 = segunda, ..., 6 = sábado)
    const dayOfWeekIndex = new Date(date).getDay();
  
    // Reorganizar o índice do JavaScript (domingo = 0) para alinhar com o padrão da API (segunda = 0)
    const adjustedIndex = (dayOfWeekIndex === 0 ? 6 : dayOfWeekIndex - 1); // Segunda = 0, ..., Domingo = 6
  
    // Mapear corretamente o dia da semana para "weekdayEn"
    const weekdayEnMap = ["tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "monday"];
    const selectedWeekdayEn = weekdayEnMap[adjustedIndex];
  
    // Encontrar o horário correspondente na API com base no "weekdayEn"
    const schedule = professional.schedules.find(
      (s) => s.weekdayEn.toLowerCase() === selectedWeekdayEn
    );
  
    if (!schedule) {
      setAvailableTimeSlots([]);
      return;
    }
  
    const { startTime, endTime } = schedule;
    const duration = parseInt(professional.appointmentSpacing, 10) || 30;
  
    // Corrigir o horário de fim, caso seja "00:00" (final do dia)
    const correctedEndTime = endTime === "00:00" ? "23:59" : endTime;
  
    // Convertendo horários para objetos Date
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${correctedEndTime}:00`);
  
    if (start >= end) {
      setAvailableTimeSlots([]); // Nenhum horário válido
      return;
    }
  
    // Gerar horários com base no `duration`
    const slots: string[] = [];
    let current = new Date(start);
    while (current < end) {
      slots.push(current.toTimeString().slice(0, 5)); // Adicionar horário no formato HH:mm
      current.setMinutes(current.getMinutes() + duration);
    }
  
    setAvailableTimeSlots(slots);
  };
  
  




  
  
  const closeModal = () => {
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
  };

  const handleConfirm = () => {
    toast.success(`Agendamento confirmado para ${selectedDate} às ${selectedTimeSlot}!`, {
      position: "top-right",
    });
    closeModal();
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
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          <span className="text-black">{serviceName}</span>
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
                    onClick={() => setSelectedProfessional(professional)}
                    className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all"
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum profissional disponível para este serviço.</p>
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
                    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Alinha o primeiro dia
                    const days = [];
                    for (let i = 0; i < firstDayOfMonth; i++) {
                      days.push(<div key={`empty-${i}`} className="w-full h-10"></div>); // Espaços vazios
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
                className={`px-4 py-2 rounded-md text-white ${isConfirmButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
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
