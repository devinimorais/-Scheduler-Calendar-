import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/img/Hero.jpg";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToServices = () => {
    navigate("/services");
  };

  return (
    <div
      className="relative bg-cover bg-center text-white min-h-screen"
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center text-center h-screen">
        <h1 className="text-5xl font-extrabold mb-4">
          Experimente o <span className="text-gray-300 underline">Melhor Serviço</span> Sob Medida
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Profissionalismo, qualidade e dedicação. Descubra tudo o que temos a oferecer.
        </p>
        <button
          onClick={handleNavigateToServices}
          className="px-6 py-3 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-300 transition"
        >
          Veja Nossos Serviços
        </button>
      </div>
    </div>
  );
};

export default Home;
