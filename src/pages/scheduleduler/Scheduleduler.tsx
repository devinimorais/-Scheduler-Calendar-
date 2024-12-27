import React, { useState } from "react";
import Navbar from "../../components/Navbar";
const Scheduler = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    {
      id: 1,
      icon: "fas fa-scissors",
      name: "Barba Completa",
      category: "SERVIÇOS CORSÁRIO",
      duration: "45 min",
      price: "R$ 45,00",
      description:
        "Retirada do volume dos excesso da barba. Aplicação de toalha quente. Alinhamento feito com máquina, tesoura e navalha.",
    },
    {
      id: 2,
      icon: "fas fa-cut",
      name: "Barba Simples [Sem toalha quente]",
      category: "SERVIÇOS CORSÁRIO",
      duration: "30 min",
      price: "R$ 35,00",
      description:
        "Retirada do volume e excessos da barba. Alinhamento feito com máquina, tesoura e navalha. Sem produtos adicionais.",
    },
    {
      id: 3,
      icon: "fas fa-user",
      name: "Cabelo Completo",
      category: "SERVIÇOS CORSÁRIO",
      duration: "45 min",
      price: "R$ 45,00",
      description:
        "Corte moderno, lavagem completa (shampoo e condicionador), secagem e modelagem com produtos exclusivos.",
    },
    {
      id: 4,
      icon: "fas fa-star",
      name: "CABELO ILIMITADO $99",
      category: "CABELO ILIMITADO",
      duration: "45 min",
      price: "R$ 99,00",
      description:
        "Corte seu cabelo toda semana, durante 30 dias corridos. EXCLUSIVO: Segundas, Terças e Quartas.",
    },
    {
      id: 5,
      icon: "fas fa-water",
      name: "Hidratação Capilar",
      category: "SERVIÇOS CORSÁRIO",
      duration: "20 min",
      price: "R$ 25,00",
      description:
        "Tratamento hidratante para revitalizar e dar brilho aos fios.",
    },
    {
      id: 6,
      icon: "fas fa-magic",
      name: "Free Style [Desenhos]",
      category: "SERVIÇOS CORSÁRIO",
      duration: "15 min",
      price: "R$ 20,00",
      description: "Desenhos estilizados feitos à mão por um especialista.",
    },
    {
      id: 7,
      icon: "fas fa-smile",
      name: "Sobrancelha Navalhada",
      category: "SERVIÇOS CORSÁRIO",
      duration: "15 min",
      price: "R$ 15,00",
      description:
        "Definição de sobrancelha com navalha para um olhar marcante.",
    },
    {
      id: 8,
      icon: "fas fa-certificate",
      name: "Combo [Corte + Barba]",
      category: "PROMOÇÕES",
      duration: "1h",
      price: "R$ 65,00",
      description: "Pacote completo de corte e barba com desconto especial.",
    },
    {
      id: 9,
      icon: "fas fa-smile-beam",
      name: "Relaxamento Capilar",
      category: "SERVIÇOS ESPECIAIS",
      duration: "40 min",
      price: "R$ 50,00",
      description:
        "Relaxamento capilar para um cabelo macio e com aparência natural.",
    },
    {
      id: 10,
      icon: "fas fa-hat-cowboy",
      name: "Penteado Completo",
      category: "SERVIÇOS CORSÁRIO",
      duration: "30 min",
      price: "R$ 40,00",
      description: "Penteado estilizado para eventos especiais.",
    },
    {
      id: 11,
      icon: "fas fa-leaf",
      name: "Tratamento Vegano",
      category: "SERVIÇOS ESPECIAIS",
      duration: "1h",
      price: "R$ 70,00",
      description:
        "Tratamento capilar 100% vegano com produtos orgânicos e naturais.",
    },
    {
      id: 12,
      icon: "fas fa-crown",
      name: "Corte VIP",
      category: "SERVIÇOS PREMIUM",
      duration: "1h",
      price: "R$ 120,00",
      description: "Experiência exclusiva com corte, barba e massagem.",
    },
  ];

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className="p-8 ">
        <h1 className="text-center text-3xl font-bold text-black mb-6 underline decoration-gray-400 decoration-4">
          Escolha um dos nossos serviços
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-8">
          <h2 className="hidden lg:block text-xl font-medium">

          </h2>
          <div className="relative w-full lg:w-1/5">
            <input
              type="text"
              placeholder="Procurar..."
              className="w-full p-2 border border-[#134647]  rounded-md shadow-md "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-2 right-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="border rounded-md shadow-md p-4 bg-white flex flex-col justify-between"
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl">
                  <i className={service.icon}></i>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.category}</p>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                <p>Duração: {service.duration}</p>
                <p>Preço: {service.price}</p>
                <p className="mt-2">{service.description}</p>
              </div>
              <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-400 transition">
                <i className="fas fa-calendar-check"></i> RESERVAR
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
