const BASE_URL = "https://api.tzsexpertacademy.com/appointments";

type Appointment = {
    id: number;
    scheduledDate: string;
    description: string;
    status: string;
    userId: number;
    ticketId: number;
    createdAt: string;
    updatedAt: string;
};


export async function fetchAllAppointments() {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar agendamentos.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function fetchAppointmentById(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar o agendamento.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function createAppointment(appointmentData) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentData),
        });
        if (!response.ok) {
            throw new Error("Erro ao criar o agendamento.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function updateAppointment(id, updatedData) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error("Erro ao atualizar o agendamento.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function deleteAppointment(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Erro ao deletar o agendamento.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}
