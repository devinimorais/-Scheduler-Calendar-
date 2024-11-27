import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/pt-br"; // Importando o idioma português
import Barber from "../../assets/img/barber.png";

// Extensões para manipulação de datas
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.locale("pt-br");

const Agendador: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs()); // Data atual
    const [selectedDate, setSelectedDate] = useState<string>(""); // Estado inicial como string vazia
    const [showModal, setShowModal] = useState<boolean>(false);

    const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]; // Horários

    // Gera os dias do mês para o calendário
    const generateCalendarDays = (): Dayjs[] => {
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

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, "month"));
    };

    const handleDateSelect = (date: Dayjs) => {
        setSelectedDate(date.format("YYYY-MM-DD"));
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDate("");
    };

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const calendarDays = generateCalendarDays();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl flex flex-col lg:flex-row">
                {/* Coluna Esquerda */}
                <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-start justify-center pr-6 border-b lg:border-b-0 lg:border-r border-gray-300 mb-4 lg:mb-0 text-center lg:text-left">
                    <img
                        src={Barber}
                        alt="Logo"
                        className="mb-4"
                    />
                </div>



                {/* Coluna Direita */}
                <div className="lg:w-2/3 w-full pl-6">
                    {/* Cabeçalho do Calendário */}
                    <div className="flex flex-col mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Escolha uma data</h2>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-600 text-sm">
                                {currentDate.format("MMMM YYYY")}
                            </p>
                            <div className="flex items-center gap-4">
                                <button
                                    className="text-teal-500 hover:text-teal-600"
                                    onClick={handlePrevMonth}
                                >
                                    &lt;
                                </button>
                                <button
                                    className="text-teal-500 hover:text-teal-600"
                                    onClick={handleNextMonth}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cabeçalho dos dias da semana */}
                    <div className="grid grid-cols-7 border-b border-gray-300">
                        {daysOfWeek.map((day, index) => (
                            <div
                                key={day}
                                className={`h-12 flex justify-center items-center text-sm font-bold text-gray-700 uppercase ${index !== daysOfWeek.length - 1 ? "border-r border-gray-300" : ""
                                    } px-2`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendário */}
                    <div className="grid grid-cols-7 gap-0 mt-2">
                        {calendarDays.map((day, index) => (
                            <div
                                key={`${day.toString()}-${index}`}
                                className={`relative h-12 flex justify-center items-center border-b border-gray-300 ${index % 7 !== 6 ? "border-r border-gray-300" : ""
                                    }`}
                            >
                                <button
                                    className={`h-10 w-10 flex justify-center items-center rounded-full text-sm ${day.isSame(currentDate, "month")
                                        ? "bg-black text-white hover:bg-teal-600"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Horários Disponíveis - {selectedDate}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {times.map((time) => (
                                <button
                                    key={time}
                                    className="py-2 px-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-teal-100"
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agendador;
