import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from 'react-router-dom';
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Team from "../../assets/img/Team1.jpg";
import "dayjs/locale/pt-br";

dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.locale("pt-br");

const Agendador: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    const navigate = useNavigate(); // Inicializa o hook useNavigate
    const generateCalendarDays = (): Dayjs[] => {
        const navigate = useNavigate();
        const startOfMonth = currentDate.startOf("month").startOf("week");
        const endOfMonth = currentDate.endOf("month").endOf("week");
        const days: Dayjs[] = [];
        let current = startOfMonth;

        while (current.isSameOrBefore(endOfMonth)) {
            days.push(current);
            current = current.add(1, "day");
        }

        return days;
    };

    const handleMonthChange = (direction: "prev" | "next") => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentDate((prevDate) =>
                direction === "prev"
                    ? prevDate.subtract(1, "month")
                    : prevDate.add(1, "month")
            );
            setIsTransitioning(false);
        }, 300);
    };

    const handleDateSelect = (date: Dayjs) => {
        setSelectedDate(date.format("DD/MM/YYYY"));
        setSelectedTime(""); // Limpa o horário selecionado
        setShowModal(true);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDate("");
        setSelectedTime("");
    };

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const calendarDays = generateCalendarDays();

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-gray-200"
        >
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md mx-4">
                        <h3 className="text-xl font-bold mb-4">Selecione um horário</h3>
                        <p className="text-gray-700 text-lg mb-4">
                            Data selecionada: <span className="font-semibold">{selectedDate}</span>
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {times.map((time) => (
                                <button
                                    key={time}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedTime === time
                                        ? "bg-[#1a3339] text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        {selectedTime && (
                            <p className="text-green-600 font-semibold mb-4">
                                Horário selecionado: {selectedTime}
                            </p>
                        )}
                        <button
                            onClick={closeModal}
                            className="bg-[#1a3339] text-white px-4 py-2 rounded-lg hover:bg-[#0f2a2d] transition-all duration-200"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>

            )}

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl flex flex-col lg:flex-row backdrop-blur-sm">
                <div
                    className="lg:w-1/3 w-full flex flex-col items-center lg:items-start justify-center pr-6 border-b lg:border-b-0 lg:border-r border-gray-300 mb-4 lg:mb-0 text-center lg:text-left"
                >
                    <button
                        className="absolute top-4 left-4 bg-gray-200 rounded-full p-2 shadow-md"
                        onClick={() => navigate('/')} // Redireciona para a página de login
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <div className="flex ">
                        <img
                            src={Team}
                            alt="Usuário"
                            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg mb-4"
                        />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">User</p>
                    <h1 className="text-black text-xl font-bold mb-2">
                        Jordan Feliphe
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m5-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        20 min
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5.121 17.804A12.063 12.063 0 0112 15c2.79 0 5.35.931 7.373 2.495M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 7a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Video/Voice call. I'll send you a link before the event.
                    </div>
                </div>
                <div className="lg:w-2/3 w-full lg:pl-6">
                    <div className="flex flex-col mb-4">
                        <div className="lg:text-center text-center">
                            <h2 className="text-2xl font-extrabold text-black tracking-wide mb-2">
                                Escolha uma data
                            </h2>
                            <div className="w-full h-1 mx-auto lg:mx-0"></div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-black text-xl font-extrabold">
                                {currentDate.format("MMMM YYYY").charAt(0).toUpperCase() +
                                    currentDate.format("MMMM , YYYY").slice(1)}
                            </p>

                            <div className="flex items-center gap-4">
                                <button
                                    className="bg-[#1a3339] text-white text-2xl px-4 py-2 rounded-full hover:bg-[#0f2a2d] transition-all duration-200"
                                    onClick={() => handleMonthChange("prev")}
                                >
                                    &lt;
                                </button>
                                <button
                                    className="bg-[#1a3339] text-white text-2xl px-4 py-2 rounded-full hover:bg-[#0f2a2d] transition-all duration-200"
                                    onClick={() => handleMonthChange("next")}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`grid grid-cols-7 gap-[2px] mt-2 w-full transition-opacity duration-400 ${isTransitioning ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        {daysOfWeek.map((day, index) => (
                            <div
                                key={`weekday-${index}`}
                                className="h-10 flex justify-center items-center font-extrabold text-lg"
                            >
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((day, index) => (
                            <div
                                key={`${day.toString()}-${index}`}
                                className="relative flex justify-center items-center"
                            >
                                <button
                                    className={`h-12 flex-grow flex justify-center items-center rounded-full text-lg font-semibold ${day.isSame(currentDate, "month")
                                        ? " text-black hover:bg-gray-300 hover:text-black"
                                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                        }`}
                                    onClick={() =>
                                        day.isSame(currentDate, "month") && handleDateSelect(day)
                                    }
                                    disabled={!day.isSame(currentDate, "month")}
                                >
                                    {day.date()}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agendador;
