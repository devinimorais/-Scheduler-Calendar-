import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

type Professional = {
  id: number;
  name: string;
  profession: string;
};

type Service = {
  id: number;
  name: string;
  description: string;
};

const Professionals = () => {
  const location = useLocation();
  const { professionals, serviceName }: { professionals: Professional[]; serviceName: string } =
    location.state || { professionals: [], serviceName: "" };

  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    { time: "09:00", available: true },
    { time: "10:00", available: false },
    { time: "11:00", available: true },
  ]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePreviousMonth = () => setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11));
  const handleNextMonth = () => setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0));

  const handleDateSelection = (day: number) => {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
  };

  const handleConfirm = () => {
    console.log("Agendamento confirmado para:", selectedDate, selectedTimeSlot);
    closeModal();
  };

  const isConfirmButtonDisabled = !selectedDate || !selectedTimeSlot;

  return (
    <div className="relative">
      <Navbar />
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          Profissionais para o Serviço: <span className="text-teal-500">{serviceName}</span>
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
            <p className="text-center text-gray-500">
              Nenhum profissional disponível para este serviço.
            </p>
          )}
        </div>
      </div>

      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-4xl w-full flex flex-col">
            <div className="flex flex-row">
              {/* Coluna esquerda: Calendário */}
              <div className="w-2/3 bg-white p-6">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={handlePreviousMonth}
                  >
                    &#9664;
                  </button>
                  <h3 className="text-lg font-bold">
                    {currentMonth + 1}/{currentYear}
                  </h3>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={handleNextMonth}
                  >
                    &#9654;
                  </button>
                </div>

                {/* Calendário */}
                <div className="grid grid-cols-7 gap-2 text-center mb-6">
                  {/* Cabeçalho com os dias da semana */}
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <span key={index} className="text-gray-500 text-sm">
                      {day}
                    </span>
                  ))}

                  {/* Espaços em branco antes do primeiro dia do mês */}
                  {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map(
                    (_, index) => (
                      <div key={`empty-${index}`} className=""></div>
                    )
                  )}

                  {/* Dias do mês */}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`;
                    const isSelected = selectedDate === formattedDate;

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelection(day)}
                        className={` ml-4 w-10 h-10 rounded-full transition-colors ${isSelected
                          ? "bg-gray-500 text-white hover:bg-gray-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center items-center gap-8 mt-4">
                  <button
                    onClick={closeModal}
                    className="text-gray-500 text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isConfirmButtonDisabled}
                    className={`text-sm ${isConfirmButtonDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-black-500'
                      }`}
                  >
                    Confirmar
                  </button>
                </div>
              </div>

              <div
                className="w-1/3 p-6 rounded-r-lg text-white"
                style={{
                  background: 'linear-gradient(145deg, #000000, #0a0a0a, #2c2c2c, #000000)',
                  boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
                }}
              >
                <h3 className="text-lg font-bold mb-4">Horários Disponíveis</h3>
                {availableTimeSlots.length > 0 ? (
                  <ul className="space-y-2">
                    {availableTimeSlots.map((slot, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          slot.available && setSelectedTimeSlot(slot.time)
                        }
                        className={`p-2 rounded-md cursor-pointer ${slot.available
                          ? selectedTimeSlot === slot.time
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-100 text-gray-700'
                          : 'bg-gray-50 text-gray-500 line-through cursor-not-allowed'
                          }`}
                      >
                        {slot.time} {!slot.available && <span>(Indisponível)</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">Nenhum horário disponível</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals;
