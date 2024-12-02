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
          <span className="text-yellow-300 underline">Reserve</span> o Serviço Perfeito <br />
          com Apenas Alguns Cliques!
        </h1>
        <p className="text-lg text-white mb-8">
          Praticidade, qualidade e confiança. Simplifique sua vida com nossos serviços sob medida.
        </p>
        <button
          onClick={handleNavigateToServices}
          className="px-8 py-4 bg-yellow-300 text-black text-xl font-bold rounded-full shadow-lg hover:bg-[#9c7250] transition"
        >
          Acesse os nossos serviços!
        </button>

      </div>
    </div>
  );
};

export default Home;
