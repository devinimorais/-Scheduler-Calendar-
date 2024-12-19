import api from "./api";

// Interface para o agendamento
export interface Appointment {
  id?: number;
  scheduledDate: string;
  description: string;
  status: string;
  userId: number;
  ticketId: number;
  createdAt?: string;
  updatedAt?: string;
}

// Função para tratar erros (do tipo `never`)
const handleApiError = (error: any): never => {
  console.error("Erro na API:", error);
  throw new Error(error.response?.data?.message || "Erro desconhecido");
};

// Listar todos os agendamentos
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get<Appointment[]>("/appointments");
    return response.data; // Sempre retorna os dados se bem-sucedido
  } catch (error) {
    return handleApiError(error); // Garante que a execução sempre tenha um fluxo definido
  }
};

// Obter detalhes de um agendamento específico
export const getAppointmentById = async (id: number): Promise<Appointment> => {
  try {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data; // Retorna os dados do agendamento
  } catch (error) {
    return handleApiError(error); // Garante o fluxo de execução
  }
};

// Criar um novo agendamento
export const createAppointment = async (
  appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">
): Promise<Appointment> => {
  try {
    const response = await api.post<Appointment>("/appointments", appointment);
    return response.data; // Retorna os dados do agendamento criado
  } catch (error) {
    return handleApiError(error); // Garante o fluxo de execução
  }
};

// Atualizar um agendamento existente
export const updateAppointment = async (
  id: number,
  appointment: Partial<Appointment>
): Promise<Appointment> => {
  try {
    const response = await api.put<Appointment>(`/appointments/${id}`, appointment);
    return response.data; // Retorna os dados do agendamento atualizado
  } catch (error) {
    return handleApiError(error); // Garante o fluxo de execução
  }
};

// Deletar um agendamento
export const deleteAppointment = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/appointments/${id}`);
    return response.data; // Retorna a mensagem de sucesso
  } catch (error) {
    return handleApiError(error); // Garante o fluxo de execução
  }
};
