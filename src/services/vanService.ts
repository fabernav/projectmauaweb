// src/services/vanService.ts
import api from "./api";

// Enum que deve corresponder ao TipoVan no backend
export enum TipoVan {
  VAN = "VAN",
  MICRO_ONIBUS = "MICRO_ONIBUS",
}

// Interface que corresponde exatamente à entidade Van no backend
export interface Van {
  id: number | null; // Pode ser null para novas vans
  placa: string;
  tipo: TipoVan; // Usando o enum para garantir valores corretos
  capacidade: number;
  ativo: boolean;
}

export type CreateVanDto = Omit<Van, "id">;
export type UpdateVanDto = Partial<Van>;

const vanService = {
  getAll: async (): Promise<Van[]> => {
    const response = await api.get("/vans");
    return response.data;
  },

  getById: async (id: number): Promise<Van> => {
    const response = await api.get(`/vans/${id}`);
    return response.data;
  },

  create: async (van: CreateVanDto): Promise<Van> => {
    const response = await api.post("/vans", van);
    return response.data;
  },

  update: async (id: number, van: UpdateVanDto): Promise<Van> => {
    const response = await api.put(`/vans/${id}`, van);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/vans/${id}`);
  },

  toggleStatus: async (id: number): Promise<Van> => {
    // Implementando o toggle baseado na API do Spring Boot
    // Precisamos primeiro obter o estado atual da van
    const van = await vanService.getById(id);
    // Depois invertemos o status e atualizamos
    const response = await api.put(`/vans/${id}`, {
      ...van,
      ativo: !van.ativo,
    });
    return response.data;
  },
};

export default vanService;
