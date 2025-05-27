import api from "./api";

export interface Van {
  id: number;
  placa: string;
  tipo: string;
  capacidade: number;
  ativo: boolean;
}

export type CreateVanDto = Omit<Van, "id">;
export type UpdateVanDto = Partial<Van>;

const vanService = {
  // Listar todas as vans
  getAll: async (): Promise<Van[]> => {
    const response = await api.get("/vans");
    return response.data;
  },

  // Obter van por ID
  getById: async (id: number): Promise<Van> => {
    const response = await api.get(`/vans/${id}`);
    return response.data;
  },

  // Criar nova van
  create: async (van: CreateVanDto): Promise<Van> => {
    const response = await api.post("/vans", van);
    return response.data;
  },

  // Atualizar van existente
  update: async (id: number, van: UpdateVanDto): Promise<Van> => {
    const response = await api.put(`/vans/${id}`, van);
    return response.data;
  },

  // Excluir van
  delete: async (id: number): Promise<void> => {
    await api.delete(`/vans/${id}`);
  },

  // Alterar status da van (ativar/desativar)
  toggleStatus: async (id: number): Promise<Van> => {
    const response = await api.patch(`/vans/${id}/toggle-status`);
    return response.data;
  },
};

export default vanService;
