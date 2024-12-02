import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { GrSchedule } from "react-icons/gr";
import { FaCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareLeft } from "react-icons/fa";

type Service = {
  id: number;
  name: string;
  duration: string; // Duração em minutos
  price: string; // Valor em reais
  description: string;
};

type TimeSlot = {
  time: string; // Horário (ex: "10:00 AM")
  available: boolean; // Disponibilidade
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3001/services");
        if (!response.ok) {
          throw new Error("Erro ao carregar os serviços");
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-red-500">{error}</p>
      </div>
    );
  }

  const closeModal = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setAvailableTimeSlots([]);
    setSelectedTimeSlot(null);
  };

  const handleDateSelection = (day: number) => {
    setSelectedDate(day);

    // Simulação de horários disponíveis (poderia ser substituído por uma chamada à API)
    const mockTimeSlots: TimeSlot[] = [
      { time: "09:00 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "01:00 PM", available: true },
      { time: "03:00 PM", available: false },
      { time: "04:00 PM", available: true },
    ];

    setAvailableTimeSlots(mockTimeSlots);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTimeSlot) {
      alert(
        `Serviço confirmado para o dia ${selectedDate}/${currentMonth + 1}/${currentYear} às ${selectedTimeSlot}!`
      );
      closeModal();
    } else {
      alert("Por favor, selecione uma data e um horário!");
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Dias no mês atual

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-snug">
          <span className="block">
            <span className="text-gray-700">Descubra</span>{" "}
            <span className="text-black underline decoration-teal-500 decoration-4">
              O Melhor Serviço
            </span>
          </span>
        </h1>
        <p className="text-center text-lg text-gray-600 italic mb-6">
          Seu momento começa aqui. Reserve agora e transforme seu dia.
        </p>

        <div className="flex justify-end items-center mb-8">
          <div className="relative w-full lg:w-1/5">
            <input
              type="text"
              placeholder="Procurar..."
              className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-black text-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-gray-500 transition duration-300"
            >
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-2 text-center uppercase tracking-wide">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  Duração: {service.duration} min
                </p>
                <p className="text-lg font-bold text-gray-100 mb-4">
                  R$ {service.price}
                </p>
                <hr className="w-3/4 border-gray-600 mb-4" />
                <p className="text-sm text-gray-300 text-center">
                  {service.description}
                </p>
              </div>
              <button
                className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold shadow-sm hover:shadow-md transition hover:bg-gray-300"
                onClick={() => setSelectedService(service)}
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-4xl w-full p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-4">
              Selecione a Data e o Horário
            </h2>
            <div className="flex flex-row gap-8">
              {/* Coluna Esquerda (Calendário) */}
              <div className="w-2/3">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    onClick={handlePreviousMonth}
                  >
                    <FaCaretSquareLeft />

                  </button>
                  <h3 className="text-xl font-semibold">
                    {months[currentMonth]} {currentYear}
                  </h3>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    onClick={handleNextMonth}
                  >
                    <FaCaretSquareRight />

                  </button>
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-sm font-medium text-gray-500 text-center"
                      >
                        {day}
                      </div>
                    )
                  )}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => (
                      <button
                        key={day}
                        onClick={() => handleDateSelection(day)}
                        className={`w-full h-10 rounded-full ${selectedDate === day
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 text-gray-700"
                          } hover:bg-purple-200`}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Coluna Direita (Horários Disponíveis) */}
              <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Horários Disponíveis</h3>
                {availableTimeSlots.length > 0 ? (
                  <ul>
                    {availableTimeSlots.map((slot, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          slot.available && setSelectedTimeSlot(slot.time)
                        }
                        className={`p-2 rounded-md mb-2 cursor-pointer ${slot.available
                          ? selectedTimeSlot === slot.time
                            ? "bg-green-500 text-white"
                            : "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700 cursor-not-allowed"
                          }`}
                      >
                        {slot.time} {slot.available ? "" : "(Indisponível)"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Nenhum horário disponível</p>
                )}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
