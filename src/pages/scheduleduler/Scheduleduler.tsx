import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/pt-br";
import Barber from "../../assets/img/barber.png";

dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.locale("pt-br");

const Agendador: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];

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
        }, 300); // Tempo da transição
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
                <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-start justify-center pr-6 border-b lg:border-b-0 lg:border-r border-gray-300 mb-4 lg:mb-0 text-center lg:text-left">
                    <img
                        src={Barber}
                        alt="Logo"
                        className="mb-4 w-32 lg:w-full" // Reduz a largura da imagem no mobile
                    />
                </div>

                <div className="lg:w-2/3 w-full lg:pl-6 ">
                    <div className="flex flex-col mb-4 ">
                        <div className="text-center">
                            <h2 className="text-2xl font-extrabold text-[#3F6262]  tracking-wide mb-2">
                                AGENDE O SEU HORÁRIO
                            </h2>
                            <div className="w-22 h-1 bg-[#3F6262] mx-auto"></div>
                        </div>


                        <div className="flex justify-between items-center mt-10">
                            <p className="text-[#3F6262] text-xl">
                                {currentDate.format("MMMM YYYY").charAt(0).toUpperCase() + currentDate.format("MMMM , YYYY").slice(1)}
                            </p>

                            <div className="flex items-center gap-4">
                                <button
                                    className="text-teal-500 hover:text-teal-600 text-2xl px-4 py-2 rounded-full bg-teal-100 hover:bg-teal-200 transition-all duration-200"
                                    onClick={() => handleMonthChange("prev")}
                                >
                                    &lt;
                                </button>
                                <button
                                    className="text-teal-500 hover:text-teal-600 text-2xl px-4 py-2 rounded-full bg-teal-100 hover:bg-teal-200 transition-all duration-200"
                                    onClick={() => handleMonthChange("next")}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transição Suave do Calendário */}
                    <div
                        className={`grid grid-cols-7 gap-0 mt-2 mx-auto w-full transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        {calendarDays.map((day, index) => (
                            <div
                                key={`${day.toString()}-${index}`}
                                className={`relative h-12 flex justify-center items-center border-b border-gray-300 ${index % 7 !== 6 ? "border-r border-gray-300" : ""
                                    }`}
                            >
                                <button
                                    className={`h-10 w-10 flex justify-center items-center rounded-full text-xl ${day.isSame(currentDate, "month")
                                        ? "bg-[#E3F5F5] text-[#3F6262] hover:bg-[#00BFFF]"
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
