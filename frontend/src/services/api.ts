import axios from 'axios';
import type { Client, CEPResponse } from '../types/Client';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

export const clientService = {
  async getAll(): Promise<Client[]> {
    const response = await api.get('/clients');
    return response.data;
  },

  async getById(id: number): Promise<Client> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  async create(client: Client): Promise<void> {
    await api.post('/clients', client);
  },

  async update(id: number, client: Client): Promise<void> {
    await api.put(`/clients/${id}`, client);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/clients/${id}`);
  },
};

export const cepService = {
  async fetchByCEP(cep: string): Promise<CEPResponse> {
    const cleanCEP = cep.replace('-', '');
    const response = await axios.get<CEPResponse>(
      `https://viacep.com.br/ws/${cleanCEP}/json/`
    );
    return response.data;
  },
};
