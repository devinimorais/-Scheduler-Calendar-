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
      className="relative bg-cover bg-center text-white h-[300px] sm:h-[400px] md:h-[500px] "
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <Navbar />
      <div className="relative flex flex-col items-center justify-start text-center h-full pt-16 sm:pt-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 px-4 leading-tight sm:leading-snug">
          <span className="text-yellow-300 underline">Reserve</span> o Serviço Perfeito <br className="hidden sm:block" />
          com Apenas Alguns Cliques!
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white mb-8 px-4">
          Praticidade, qualidade e confiança. Simplifique sua vida com nossos serviços sob medida.
        </p>
      </div>
    </div>
  );
};

export default Home;
