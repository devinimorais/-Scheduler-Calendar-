import React, { useEffect, useState } from "react";
import axios from "axios";

interface Professional {
  id: number;
  name: string;
  title: string;
  email: string;
  
}

interface ProfessionalsModalProps {
  serviceId: number;
  onClose: () => void;
  isOpen: boolean;
}

const ProfessionalsModal: React.FC<ProfessionalsModalProps> = ({ serviceId, onClose, isOpen }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchProfessionals();
    }
  }, [isOpen]);

  const fetchProfessionals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.tzsexpertacademy.com/service`, {
        params: { serviceId },
      });

      setProfessionals(response.data.professionals);
    } catch (err) {
      setError("Erro ao carregar profissionais. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Profissionais do Serviço</h2>
        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : professionals.length > 0 ? (
          <ul className="space-y-3">
            {professionals.map((professional) => (
              <li
                key={professional.id}
                className="p-4 border rounded-md hover:bg-gray-50 transition"
              >
                <p>
                  <strong>{professional.name}</strong> - {professional.title}
                </p>
                <p className="text-sm text-gray-600">{professional.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Nenhum profissional encontrado para este serviço.</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsModal;
