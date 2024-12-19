import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const BookTime = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [registros, setRegistros] = useState([
        {
            funcionario: "Felipe Silva - 01",
            data: "Seg - 01/05/2000",
            primeiroRegistro: "09h56:09",
            ultimoRegistro: "8h45:12",
            totalTrabalhado: "08:45:12",
        },
        {
            funcionario: "23r23rf3v2",
            data: "Seg - 01/05/2000",
            primeiroRegistro: "09h56:09",
            ultimoRegistro: "8h45:12",
            totalTrabalhado: "07:45:12",
        },
        {
            funcionario: "dsfsdfdsf",
            data: "Seg - 01/05/2000",
            primeiroRegistro: "09h56:09",
            ultimoRegistro: "8h45:12",
            totalTrabalhado: "08:45:12",
        },
        {
            funcionario: "Outro Funcionário",
            data: "Ter - 02/05/2000",
            primeiroRegistro: "08h00:00",
            ultimoRegistro: "16h00:00",
            totalTrabalhado: "08:00:00",
        },
        {
            funcionario: "Outro Teste",
            data: "Qua - 03/05/2000",
            primeiroRegistro: "09h00:00",
            ultimoRegistro: "18h00:00",
            totalTrabalhado: "09:00:00",
        },
        {
            funcionario: "Teste Extra",
            data: "Qui - 04/05/2000",
            primeiroRegistro: "10h00:00",
            ultimoRegistro: "15h00:00",
            totalTrabalhado: "05:00:00",
        },
    ]);

    const totalPages = Math.ceil(registros.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = registros.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (direction: string) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleDelete = (indexToDelete: number) => {
        const updatedRegistros = registros.filter((_, index) => index !== indexToDelete);
        setRegistros(updatedRegistros);

        // Ajusta a página atual se o registro deletado esvaziar a última página
        if (currentPage > Math.ceil(updatedRegistros.length / rowsPerPage)) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
    };


    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-left">Horários reservados</h2>
                <div className="mb-4 flex gap-4">
                    <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300">
                        <option>Ano</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300">
                        <option>Mês</option>
                        <option>Janeiro</option>
                        <option>Fevereiro</option>
                        <option>Março</option>
                        <option>Abril</option>
                        <option>Maio</option>
                        <option>Junho</option>
                        <option>Julho</option>
                        <option>Agosto</option>
                        <option>Setembro</option>
                        <option>Outubro</option>
                        <option>Novembro</option>
                        <option>Dezembro</option>
                    </select>
                    <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300">
                        <option>Serviços</option>
                        <option>Felipe Silva - 01</option>
                        <option>23r23rf3v2</option>
                        <option>dsfsdfdsf</option>
                        <option>Outro Funcionário</option>
                    </select>
                </div>

                <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-2 text-left">Data</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Horário</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Último Horário</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Serviços</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((registro, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 1 ? "bg-green-50" : ""
                                    } hover:bg-gray-100`}
                            >
                                <td className="border border-gray-200 px-4 py-2">{registro.data}</td>
                                <td className="border border-gray-200 px-4 py-2 font-medium">{registro.primeiroRegistro}</td>
                                <td className="border border-gray-200 px-4 py-2">{registro.ultimoRegistro}</td>
                                <td className="border border-gray-200 px-4 py-2">{registro.totalTrabalhado}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(startIndex + index)}
                                        className="text-white bg-gray-500 hover:bg-gray-800 px-4 py-1 rounded-lg"
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginação */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Linhas por página:</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                            className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handlePageChange("prev")}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded-full ${currentPage === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-blue-500 hover:bg-gray-200"
                                }`}
                        >
                            &lt;
                        </button>
                        <span className="text-sm text-gray-600">
                            {startIndex + 1}-{Math.min(startIndex + rowsPerPage, registros.length)} de {registros.length}
                        </span>
                        <button
                            onClick={() => handlePageChange("next")}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded-full ${currentPage === totalPages
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-blue-500 hover:bg-gray-200"
                                }`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTime;
