import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

type TimeSlot = {
  time: string;
  available: boolean;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.post("https://api.tzsexpertacademy.com/bypass/", {
          url: "https://api.tzsexpertacademy.com/service/16",
          method: "GET",
        });
        setServices(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDateSelection = (day: number) => {
    if (!selectedProfessional) return;

    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);

    const mockTimeSlots: TimeSlot[] = [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: true },
      { time: "13:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: true },
    ];

    setAvailableTimeSlots(mockTimeSlots);
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedProfessional || !selectedDate || !selectedTimeSlot || !email) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    toast.success(
      `Serviço confirmado com ${selectedProfessional.name} no dia ${selectedDate} às ${selectedTimeSlot}.`
    );
    closeModal();
  };

  const closeModal = () => {
    setSelectedService(null);
    setSelectedProfessional(null);
    setSelectedDate(null);
    setAvailableTimeSlots([]);
    setSelectedTimeSlot(null);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />
      <ToastContainer />
      <div className="p-6 lg:p-8 mt-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-4">
          Descubra o Melhor Serviço
        </h1>
        <div className="flex justify-end mb-6">
          <input
            type="text"
            placeholder="Procurar serviços..."
            className="border p-2 rounded-md w-full lg:w-1/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((service) => (
              <div
                key={service.id}
                className="relative bg-[#f8f9fa] text-gray-900 rounded-lg"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-black to-gray-500 text-white px-4 py-2 rounded-bl-xl shadow-lg">
                  <p className="text-sm font-bold">R$ {service.price}</p>
                </div>

                <div className="h-2 bg-black rounded-t-lg"></div>
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-wide text-left">
                    {service.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium border-t border-black pt-3"></p>
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-gray-900 font-semibold text-lg">
                        Descrição: {service.description.charAt(0).toUpperCase() + service.description.slice(1)}
                      </p>
                      <p className="text-gray-900 font-semibold text-lg">Duração: {service.duration} min</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all"
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
        </div>



      </div>

      {selectedService && !selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold">Profissionais para {selectedService.name}</h2>
            <ul className="mt-4 space-y-2">
              {selectedService.users.map((user) => (
                <li
                  key={user.id}
                  className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => setSelectedProfessional(user)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold">Agendar com {selectedProfessional.name}</h2>
            <div className="flex justify-between mt-4">
              <button onClick={handlePreviousMonth}>&lt;</button>
              <span>
                {currentMonth + 1}/{currentYear}
              </span>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-4">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDateSelection(day)}
                  className={`p-2 rounded-full ${selectedDate ===
                    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="mt-4">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTimeSlot(slot.time)}
                  disabled={!slot.available}
                  className={`px-4 py-2 rounded-md mr-2 ${slot.available
                    ? selectedTimeSlot === slot.time
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                    : "bg-red-200"
                    }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <button
              onClick={handleConfirm}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;

function setError(message: string) {
  throw new Error("Function not implemented.");
}
